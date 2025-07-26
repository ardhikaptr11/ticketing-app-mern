import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import eventServices from "@/services/event.service";
import { useDebounce } from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";

const schemaUpdateEventLocation = yup.object().shape({
    isOnline: yup.string().required("Location is required"),
    address: yup.string().required("Address is required"),
    region: yup.string().required("Region is required"),
    longitude: yup.string().required("Longitude is required"),
    latitude: yup.string().required("Latitude is required"),
});

const useLocationTab = () => {
    const [searchRegency, setSearchRegency] = useState("");
    const { setToaster } = useContext(ToasterContext);
    const debounce = useDebounce();

    const {
        control: controlUpdateEventLocation,
        handleSubmit: handleSubmitUpdateEventLocation,
        formState: { errors: errorsUpdateEventLocation },
        reset: resetUpdateEventLocation,
        setValue: setValueUpdateEventLocation,
        watch: watchUpdateEventLocation,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schemaUpdateEventLocation),
    });

    const isOnline = watchUpdateEventLocation("isOnline");

    const getGeolocation = async (regency: string) => {
        const { data } = await eventServices.getGeolocationByRegency(regency);
        const { latitude, longitude } = data.data.results[0].location;

        return { latitude, longitude };
    };

    const { data: dataRegion } = useQuery({
        queryKey: ["Regions", searchRegency],
        queryFn: () =>
            eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== "",
    });

    const {
        mutate: mutateFetchGeolocation,
        isPending: isPendingMutateFetchGeolocation,
    } = useMutation({
        mutationFn: (regency: string) => getGeolocation(regency),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: (data) => {
            setValueUpdateEventLocation("latitude", data?.latitude);
            setValueUpdateEventLocation("longitude", data?.longitude);
            clearErrors(["latitude", "longitude"]);
        },
    });

    const handleFetchGeolocation = () => mutateFetchGeolocation(searchRegency);

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY);
    };

    return {
        controlUpdateEventLocation,
        dataRegion,
        errorsUpdateEventLocation,
        handleFetchGeolocation,
        handleSearchRegion,
        handleSubmitUpdateEventLocation,
        isPendingMutateFetchGeolocation,
        isOnline,
        searchRegency,
        setValueUpdateEventLocation,
    };
};

export default useLocationTab;
