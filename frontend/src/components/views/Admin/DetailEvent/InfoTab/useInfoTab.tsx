import { IEvent, IEventForm } from "@/types/Event";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { compareTime } from "../../Event/AddEventModal/useAddEventModal";
import { currentDate, standardizeDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import categoryServices from "@/services/category.service";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { generateSlug } from "@/utils/slug";
import { DateValue } from "@heroui/react";

const schemaUpdateEventInfo = yup.object().shape({
    name: yup.string().required("Event name is required"),
    slug: yup.string().required("Slug is required"),
    category: yup.string().required("Please select category"),
    startDate: yup
        .mixed<DateValue>()
        .required("Please specify the start date")
        .test("is-valid-start-date", "Past is not allowed", function (value) {
            if (!value) return true;

            if (value.year < currentDate.year) return false;

            return value.compare(currentDate) >= 0;
        }),
    endDate: yup
        .mixed<DateValue>()
        .required("Please specify the end date")
        .test(
            "is-valid-end-date",
            "End date must be different",
            function (value) {
                const { startDate } = this.parent;

                if (!value) return true;

                if (value.year < currentDate.year) {
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
    description: yup.string().required("Event description is required"),
});

const useInfoTab = () => {
    const { isReady } = useRouter();

    const {
        control: controlUpdateEventInfo,
        handleSubmit: handleSubmitUpdateEventInfo,
        formState: { errors: errorsUpdateEventInfo },
        reset: resetUpdateEventInfo,
        setValue: setValueUpdateEventInfo,
        watch: watchUpdateEventInfo,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schemaUpdateEventInfo),
    });

    const nameValue = watchUpdateEventInfo("name") || "";
    const slugValue = watchUpdateEventInfo("slug") || "";
    const startDateValue: DateValue | undefined =
        watchUpdateEventInfo("startDate");

    useEffect(() => {
        const slug = generateSlug(nameValue);
        setValueUpdateEventInfo("slug", slug);

        if (nameValue !== "") {
            clearErrors("slug");
        }
    }, [nameValue, setValueUpdateEventInfo]);

    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
        enabled: isReady,
    });

    return {
        controlUpdateEventInfo,
        dataCategory,
        errorsUpdateEventInfo,
        handleSubmitUpdateEventInfo,
        resetUpdateEventInfo,
        setValueUpdateEventInfo,
        slugValue,
        startDateValue,
        watchUpdateEventInfo,
    };
};

export default useInfoTab;
