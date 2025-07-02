import { IEvent, IEventForm } from "@/types/Event";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { currentDate, standardizeDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import eventServices from "@/services/event.service";
import { useDebounce } from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.constants";

const schemaUpdateEventLocation = yup.object().shape({
    isOnline: yup.string().required("Location is required"),
    region: yup.string().required("Region is required"),
    longitude: yup.string().required("Longitude is required"),
    latitude: yup.string().required("Latitude is required"),
});

const useInfoTab = () => {
    const [searchRegency, setSearchRegency] = useState("");
    const debounce = useDebounce();

    const {
        control: controlUpdateEventLocation,
        handleSubmit: handleSubmitUpdateEventLocation,
        formState: { errors: errorsUpdateEventLocation },
        reset: resetUpdateEventLocation,
        setValue: setValueUpdateEventLocation,
        watch: watchUpdateEventLocation,
    } = useForm({
        resolver: yupResolver(schemaUpdateEventLocation),
    });

    const { data: dataRegion } = useQuery({
        queryKey: ["Regions", searchRegency],
        queryFn: () =>
            eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== "",
    });

    const handleGetRegency = async (id: string) => {
        const { data } = await eventServices.getRegencyById(id);
        return data.data;
    }

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY);
    };

    return {
        controlUpdateEventLocation,
        dataRegion,
        handleSearchRegion,
        errorsUpdateEventLocation,
        handleSubmitUpdateEventLocation,
        handleGetRegency,
        resetUpdateEventLocation,
        searchRegency,
        setValueUpdateEventLocation,
        watchUpdateEventLocation,
    };
};

export default useInfoTab;
