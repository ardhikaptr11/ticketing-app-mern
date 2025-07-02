import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

import categoryServices from "@/services/category.service";
import useChangeURL from "@/hooks/useChangeURL";

export const useCategory = () => {
    const [selectedId, setSelectedId] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const { isReady } = useRouter();

    const { currentLimit, currentPage, currentSearch } = useChangeURL();

    const getCategories = async () => {
        const params = currentSearch
            ? `page=${currentPage}&limit=${currentLimit}&search=${currentSearch}`
            : `page=${currentPage}&limit=${currentLimit}`;

        const res = await categoryServices.getCategories(params);
        const { data } = res;

        return data;
    };

    const {
        data: dataCategory,
        isLoading: isLoadingCategory,
        isRefetching: isRefetchingCategory,
        refetch: refetchCategories,
    } = useQuery({
        queryKey: ["Categories", currentPage, currentLimit, currentSearch],
        queryFn: () => getCategories(),
        enabled: isReady && !!currentPage && !!currentLimit,
    });

    return {
        currentPage,
        currentLimit,
        currentSearch,
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategories,
        selectedId,
        setSelectedId,
        selectedIcon,
        setSelectedIcon,
    };
};
