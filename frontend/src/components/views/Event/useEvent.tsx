import useChangeURL from "@/hooks/useChangeURL";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
    const {
        currentCategory,
        currentIsFeatured,
        currentIsOnline,
        currentLimit,
        currentPage,
        currentSearch,
    } = useChangeURL();

    const { isReady } = useRouter();

    const getEvents = async () => {
        const params = `page=${currentPage}&limit=${currentLimit}&category=${currentCategory}&isFeatured=${currentIsFeatured}&isOnline=${currentIsOnline}&isPublished=true`;

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
        queryKey: [
            "Events",
            currentPage,
            currentLimit,
            currentCategory,
            currentIsFeatured,
            currentIsOnline,
            currentSearch,
        ],
        queryFn: getEvents,
        enabled: isReady && !!currentPage && !!currentLimit,
    });

    return {
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents,
        refetchEvents,
    };
};

export default useEvent;
