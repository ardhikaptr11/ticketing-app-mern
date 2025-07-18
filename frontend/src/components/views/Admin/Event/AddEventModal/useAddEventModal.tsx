import environment from "@/config/environment";
import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useDebounce } from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { standardizeDate } from "@/utils/date";
import { generateSlug } from "@/utils/slug";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const compareTime = ({
    start,
    end,
}: {
    start: { hour: number; minute: number };
    end: { hour: number; minute: number };
}) => {
    const startHour = start.hour;
    const startMinute = start.minute;

    const endHour = end.hour;
    const endMinute = end.minute;

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    return endTotal > startTotal;
};

const addEventSchema = yup.object().shape({
    name: yup.string().required("Event name is required"),
    slug: yup.string().required("Slug is required"),
    category: yup.string().required("Please select category"),
    startDate: yup
        .mixed<DateValue>()
        .required("Please specify the start date")
        .test("is-valid-start-date", "Past is not allowed", function (value) {
            if (!value) return true;
            return value.compare(now(getLocalTimeZone())) >= 0;
        }),
    endDate: yup
        .mixed<DateValue>()
        .required("Please specify the end date")
        .test(
            "is-valid-end-date",
            "End date must be after start date",
            function (value) {
                const { startDate } = this.parent;

                if (!value || !startDate) return true;

                if (value.year < now(getLocalTimeZone()).year) {
                    return this.createError({
                        message: "Past is not allowed",
                    });
                }

                const isSameAsStart =
                    value.year === startDate.year &&
                    value.month === startDate.month &&
                    value.day === startDate.day;

                const startDateHour = startDate.hour;
                const startDateMinute = startDate.minute;

                const endDateHour = "hour" in value ? value.hour : 0;
                const endDateMinute = "minute" in value ? value.minute : 0;

                if (isSameAsStart) {
                    const isValidTime = compareTime({
                        start: {
                            hour: startDateHour,
                            minute: startDateMinute,
                        },
                        end: {
                            hour: endDateHour,
                            minute: endDateMinute,
                        },
                    });

                    if (!isValidTime) {
                        return this.createError({
                            message: "End time must be after start time",
                        });
                    }
                }

                if (value.compare(startDate) < 0) {
                    return this.createError({
                        message: "End date must be after start date",
                    });
                }

                return true;
            },
        ),
    isPublished: yup.string().required("Please select one of the options"),
    isFeatured: yup.string().required("Please select one of the options"),
    isOnline: yup.string().required("Please select one of the options"),
    description: yup.string().required("Event description is required"),
    region: yup.string().when(["isOnline"], ([isOnline], schema) => {
        return isOnline === "false"
            ? schema.required("City is required")
            : schema.notRequired();
    }),
    latitude: yup
        .string()
        .when(["isOnline", "region"], ([isOnline, region], schema) => {
            if (isOnline === "false" && region !== "") {
                return schema.required("Latitude coordinate is required");
            }
            return schema.notRequired();
        }),
    longitude: yup
        .string()
        .when(["isOnline", "region"], ([isOnline, region], schema) => {
            if (isOnline === "false" && region !== "") {
                return schema.required("Longitude coordinate is required");
            }
            return schema.notRequired();
        }),
    banner: yup.mixed<FileList | string>().required("Banner is required"),
});

const useAddEventModal = () => {
    const [searchRegency, setSearchRegency] = useState("");
    const { isReady } = useRouter();

    const { setToaster } = useContext(ToasterContext);
    const debounce = useDebounce();

    const {
        handleUploadFile,
        handleDeleteFile,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue: setValueAddEventModal,
        clearErrors,
    } = useForm({
        resolver: yupResolver(addEventSchema),
    });

    const preview = watch("banner") || "";
    const nameValue = watch("name") || "";
    const slugValue = watch("slug") || "";
    const isOnline = watch("isOnline") || "";

    const startDateValue: DateValue | undefined = watch("startDate");

    const fileURL = getValues("banner");

    useEffect(() => {
        if (startDateValue)
            setValueAddEventModal("endDate", startDateValue.add({ hours: 1 }));
    }, [startDateValue]);

    useEffect(() => {
        const slug = generateSlug(nameValue);
        setValueAddEventModal("slug", slug);

        if (nameValue !== "") clearErrors("slug");
    }, [nameValue, setValueAddEventModal]);

    useEffect(() => {
        const tempURL = sessionStorage.getItem("temp_uploaded_banner");

        if (tempURL) {
            handleDeleteFile(tempURL, () =>
                sessionStorage.removeItem("temp_uploaded_banner"),
            );
        }
    }, []);

    const handleUploadBanner = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileURL: string | undefined) => {
            if (fileURL) {
                setValueAddEventModal("banner", fileURL);
                sessionStorage.setItem("temp_uploaded_banner", fileURL);
            }
        });
    };

    const handleDeleteBanner = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleDeleteFile(fileURL, () => onChange(undefined));
    };

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileURL, () => {
            reset();
            onClose();
        });
    };

    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
        enabled: isReady,
    });

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY);
    };

    const { data: dataRegion } = useQuery({
        queryKey: ["Regions", searchRegency],
        queryFn: () =>
            eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== "",
    });

    const getGeolocation = async (regency: string) => {
        const { data } = await eventServices.getGeolocationByRegency(regency);
        const { latitude, longitude } = data.data.results[0].location;

        return { latitude, longitude };
    };


    const { mutate: mutateFetchGeolocation, isPending: isPendingMutateFetchGeolocation} =
        useMutation({
            mutationFn: (regency: string) => getGeolocation(regency),
            onError: (error) => {
                setToaster({
                    type: "error",
                    message: error.message,
                });
            },
            onSuccess: (data) => {
                setValueAddEventModal("latitude", data.latitude);
                setValueAddEventModal("longitude", data.longitude);
                clearErrors(["latitude", "longitude"]);
            },
        });

    const handleFetchGeolocation = () => mutateFetchGeolocation(searchRegency);

    const addEvent = async (payload: IEvent) => {
        sessionStorage.removeItem("temp_uploaded_banner");

        const res = await eventServices.addEvent(payload);
        return res;
    };

    const {
        mutate: mutateAddEvent,
        isPending: isPendingMutateAddEvent,
        isSuccess: isSuccessMutateAddEvent,
    } = useMutation({
        mutationFn: addEvent,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            reset();
            setToaster({
                type: "success",
                message: "Event successfully added",
            });
        },
    });

    const handleAddEvent = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: data.isFeatured === "true" ? true : false,
            isPublished: data.isPublished === "true" ? true : false,
            isOnline: data.isOnline === "true" ? true : false,
            startDate: data.startDate
                ? standardizeDate(data.startDate as DateValue)
                : "",
            endDate: data.endDate
                ? standardizeDate(data.endDate as DateValue)
                : "",
            location: {
                region: data.isOnline === "true" ? "0" : `${data.region}`,
                coordinates:
                    data.isOnline === "true"
                        ? [0, 0]
                        : [Number(data.latitude), Number(data.longitude)],
            },
            banner: data.banner,
        };

        mutateAddEvent(payload);
    };

    return {
        control,
        dataCategory,
        dataRegion,
        errors,
        handleAddEvent,
        handleDeleteBanner,
        handleFetchGeolocation,
        handleOnClose,
        handleSearchRegion,
        handleSubmitForm,
        handleUploadBanner,
        isPendingMutateFetchGeolocation,
        isOnline,
        isPendingMutateAddEvent,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        isSuccessMutateAddEvent,
        preview,
        searchRegency,
        slugValue,
        startDateValue,
    };
};

export default useAddEventModal;
