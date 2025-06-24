import { ALLOWED_LIMITS, DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useDebounce } from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export const useCategory = () => {
    const { isReady, push, query, replace } = useRouter();
    const debounce = useDebounce();

    const currentLimit = query.limit;
    const currentPage = query.page;
    const currentSearch = query.search;

    const setURL = () => {

        if (!ALLOWED_LIMITS.includes(currentLimit as string)) {
            replace({
                query: {
                    limit: LIMIT_DEFAULT,
                    page: PAGE_DEFAULT,
                    search: currentSearch || "",
                },
            });
            return;
        }
        
        replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || "",
            },
        });
    };

    const getCategories = async () => {
        const params = currentSearch
            ? `page=${currentPage}&limit=${currentLimit}&search=${currentSearch}`
            : `page=${currentPage}&limit=${currentLimit}`;

        const res = await categoryServices.getCategories(params);
        const { data } = res;

        return data;
    };

    const handleChangePage = (page: number) => {
        push({
            query: {
                ...query,
                page,
            },
        });
    };

    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLimit = e.target.value;
        push({
            query: {
                ...query,
                limit: selectedLimit,
                page: PAGE_DEFAULT,
            },
        });
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const searchValue = e.target.value.trim();
            push({
                query: {
                    ...query,
                    search: searchValue || "",
                    page: PAGE_DEFAULT,
                },
            });
        }, DELAY)
    }

    const handleClearSearch = () => {
        push({
            query: {
                ...query,
                search: "",
                page: PAGE_DEFAULT,
            },
        });
    };

    const {
        data: dataCategory,
        isLoading: isLoadingCategory,
        isRefetching: isRefetchingCategory,
    } = useQuery({
        queryKey: ["Category", currentPage, currentLimit, currentSearch],
        queryFn: () => getCategories(),
        enabled: isReady && !!currentPage && !!currentLimit,
    });

    return {
        currentPage,
        currentLimit,
        currentSearch,
        dataCategory,
        handleChangePage,
        handleChangeLimit,
        handleSearch,
        handleClearSearch,
        isLoadingCategory,
        isRefetchingCategory,
        setURL,
    };
};
