import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

import bannerServices from "@/services/banner.service";
import useChangeURL from "@/hooks/useChangeURL";

export const useBanner = () => {
    const [selectedId, setSelectedId] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const { isReady } = useRouter();

    const { currentLimit, currentPage, currentSearch } = useChangeURL();

    const getBanners = async () => {
        const params = currentSearch
            ? `page=${currentPage}&limit=${currentLimit}&search=${currentSearch}`
            : `page=${currentPage}&limit=${currentLimit}`;

        const res = await bannerServices.getBanners(params);
        const { data } = res;

        return data;
    };

    const {
        data: dataBanners,
        isLoading: isLoadingBanners,
        isRefetching: isRefetchingBanners,
        refetch: refetchBanners,
    } = useQuery({
        queryKey: ["Banners", currentPage, currentLimit, currentSearch],
        queryFn: getBanners,
        enabled: isReady && !!currentPage && !!currentLimit,
    });

    return {
        currentPage,
        currentLimit,
        currentSearch,
        dataBanners,
        isLoadingBanners,
        isRefetchingBanners,
        refetchBanners,
        selectedId,
        setSelectedId,
        selectedImage,
        setSelectedImage,
    };
};
