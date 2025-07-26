import { DELAY } from "@/constants/list.constants";
import { useDebounce } from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const useLandingPageLayoutNavbar = () => {
    const { isReady } = useRouter();
    const { status } = useSession();

    const [searchEvent, setSearchEvent] = useState("");

    const debounce = useDebounce();

    const getProfile = async () => {
        const { data } = await authServices.getProfile();

        return data.data;
    };

    const { data: dataProfile } = useQuery({
        queryKey: ["Profile"],
        queryFn: getProfile,
        enabled: isReady && status === "authenticated",
    });

    const handleSearchEvent = (event: string) => {
        debounce(() => setSearchEvent(event), DELAY);
    };

    const handleClearSearch = () => setSearchEvent("");

    const getEvents = async () => {
        const { data } = await eventServices.getEvents(`search=${searchEvent}`);

        return data.data;
    };

    const {
        data: dataSearchEvents,
        isRefetching: isRefetchingSearchEvents,
        isLoading: isLoadingSearchEvents,
    } = useQuery({
        queryKey: ["searchEvent", searchEvent],
        queryFn: getEvents,
        enabled: searchEvent !== "",
    });

    return {
        dataProfile,
        dataSearchEvents,
        handleClearSearch,
        handleSearchEvent,
        isRefetchingSearchEvents,
        isLoadingSearchEvents,
        searchEvent,
    };
};
export default useLandingPageLayoutNavbar;
