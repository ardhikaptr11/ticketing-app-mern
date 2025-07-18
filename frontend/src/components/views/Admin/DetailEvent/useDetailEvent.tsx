import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { standardizeDate } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailEvent = () => {
    const { query, isReady } = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const getEventById = async () => {
        const { data } = await eventServices.getEventById(`${query.id}`);
        return data.data;
    };

    const { data: dataEvent, refetch: refetchEvent } = useQuery({
        queryKey: ["Event"],
        queryFn: getEventById,
        enabled: isReady,
    });

    const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
        useQuery({
            queryKey: ["defaultRegion", dataEvent?.location?.region],
            queryFn: () =>
                eventServices.getRegencyById(dataEvent?.location?.region),
            enabled: !!dataEvent?.location?.region,
        });

    const updateEvent = async (payload: IEvent) => {
        const { data } = await eventServices.updateEvent(
            `${query.id}`,
            payload,
        );
        return data.data;
    };

    const {
        mutate: mutateUpdateEventInfo,
        isPending: isPendingMutateUpdateEventInfo,
        isSuccess: isSuccessMutateUpdateEventInfo,
    } = useMutation({
        mutationFn: (payload: IEvent) => updateEvent(payload),
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;

            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            refetchEvent();
            setToaster({
                type: "success",
                message: "Event successfully updated",
            });
        },
    });

    const handleUpdateEvent = (data: IEvent) => mutateUpdateEventInfo(data);

    const handleUpdateEventInfo = async (data: IEventForm) => {
        const inputToCompare = [
            "name",
            "slug",
            "category",
            "startDate",
            "endDate",
            "isPublished",
            "isFeatured",
            "description",
        ] as const;

        const payload = {
            ...data,
            isFeatured: data.isFeatured === "true" ? true : false,
            isPublished: data.isPublished === "true" ? true : false,
            startDate: data.startDate
                ? standardizeDate(data.startDate as DateValue)
                : "",
            endDate: data.endDate
                ? standardizeDate(data.endDate as DateValue)
                : "",
        };

        const event = await getEventById();

        const prevData = {
            name: event.name,
            slug: event.slug,
            category: event.category,
            startDate: event.startDate,
            endDate: event.endDate,
            isPublished: event.isPublished,
            isFeatured: event.isFeatured,
            description: event.description,
        };

        const isEqual = inputToCompare.every(
            (item) => payload[item] === prevData[item],
        );

        if (isEqual) {
            return setToaster({
                type: "error",
                message: "At least one field must be changed",
            });
        }

        mutateUpdateEventInfo(payload);
    };

    const handleUpdateEventLocation = async (data: IEventForm) => {
        const inputToCompare = ["isOnline", "location"] as const;

        const payload = {
            isOnline: data.isOnline === "true" ? true : false,
            location: {
                address: data.isOnline === "true" ? "" : `${data.address}`,
                region: data.isOnline === "true" ? "0" : `${data.region}`,
                coordinates:
                    data.isOnline === "true"
                        ? [0, 0]
                        : [Number(data.latitude), Number(data.longitude)],
            },
        };

        const event = await getEventById();

        const prevData = {
            isOnline: event.isOnline,
            location: {
                address: event.location.address,
                region: `${event.location.region}`,
                coordinates: [
                    event.location.coordinates[0],
                    event.location.coordinates[1],
                ],
            },
        };

        const isEqual = inputToCompare.every((item) => {
            if (item === "location") {
                return (
                    payload[item].address === prevData[item].address &&
                    payload[item].region === prevData[item].region &&
                    payload[item].coordinates[0] ===
                        prevData[item].coordinates[0] &&
                    payload[item].coordinates[1] ===
                        prevData[item].coordinates[1]
                );
            } else {
                return payload[item] === prevData[item];
            }
        });

        if (isEqual) {
            return setToaster({
                type: "error",
                message: "At least one field must be changed",
            });
        }

        mutateUpdateEventInfo(payload);
    };

    return {
        dataDefaultRegion,
        dataEvent,
        handleUpdateEvent,
        handleUpdateEventInfo,
        handleUpdateEventLocation,
        isPendingDefaultRegion,
        isPendingMutateUpdateEventInfo,
        isSuccessMutateUpdateEventInfo,
    };
};

export default useDetailEvent;
