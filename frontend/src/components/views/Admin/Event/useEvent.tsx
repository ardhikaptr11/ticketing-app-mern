import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

import useChangeURL from "@/hooks/useChangeURL";
import eventServices from "@/services/event.service";

export const useEvent = () => {
    const [selectedId, setSelectedId] = useState("");
    const [selectedBanner, setSelectedBanner] = useState("");
    const { isReady } = useRouter();

    const { currentLimit, currentPage, currentSearch } = useChangeURL();

    const getEvents = async () => {
        const params = currentSearch
            ? `page=${currentPage}&limit=${currentLimit}&search=${currentSearch}`
            : `page=${currentPage}&limit=${currentLimit}`;

        const res = await eventServices.getEvents(params);
        const { data } = res;

        return data;
    };

    const {
        data: dataEvents,
        isLoading: isLoadingEvents,
        isRefetching: isRefetchingEvents,
        refetch: refetchEvents,
    } = useQuery({
        queryKey: ["Events", currentPage, currentLimit, currentSearch],
        queryFn: getEvents,
        enabled: isReady && !!currentPage && !!currentLimit,
    });

    return {
        currentPage,
        currentLimit,
        currentSearch,
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents,
        refetchEvents,
        selectedBanner,
        setSelectedBanner,
        selectedId,
        setSelectedId,
    };
};
