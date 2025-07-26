import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import {
    PAGE_DEFAULT,
    LIMIT_BANNERS,
    LIMIT_DEFAULT,
    LIMIT_CATEGORIES,
} from "@/constants/list.constants";
import eventServices from "@/services/event.service";
import categoryServices from "@/services/category.service";

const useHome = () => {
    const getBanners = async () => {
        const params = `page=${PAGE_DEFAULT}&limit=${LIMIT_BANNERS}`;
        // const params = `page=${PAGE_DEFAULT}&limit=${LIMIT_BANNERS}&isShow=true`;

        const res = await bannerServices.getBanners(params);
        const { data } = res;

        return data;
    };

    const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
        queryKey: ["Banners"],
        queryFn: getBanners,
    });

    const getCategories = async () => {
        const params = `page=${PAGE_DEFAULT}&limit=${LIMIT_CATEGORIES}`;

        const res = await categoryServices.getCategories(params);
        const { data } = res;

        return data;
    };

    const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ["Categories"],
        queryFn: getCategories,
    });

    const currentEventQuery = `page=${PAGE_DEFAULT}&limit=${LIMIT_DEFAULT}&isPublished=true`;

    const getEvents = async (params: string) => {
        const res = await eventServices.getEvents(params);
        const { data } = res;

        return data;
    };

    const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
        useQuery({
            queryKey: ["FeaturedEvents"],
            queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`),
        });

    const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } =
        useQuery({
            queryKey: ["LatestEvents"],
            queryFn: () => getEvents(currentEventQuery),
        });

    return {
        dataBanners,
        dataCategories,
        dataFeaturedEvents,
        dataLatestEvents,
        isLoadingBanners,
        isLoadingCategories,
        isLoadingFeaturedEvents,
        isLoadingLatestEvents,
    };
};

export default useHome;
