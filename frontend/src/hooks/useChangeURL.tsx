import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import { useDebounce } from "./useDebounce";
import { ChangeEvent } from "react";

const useChangeURL = () => {
    const { push, query, replace } = useRouter();
    const debounce = useDebounce();

    const currentLimit = query.limit;
    const currentPage = query.page;
    const currentSearch = query.search;
    const currentCategory = query.category;
    const currentIsOnline = query.isOnline;
    const currentIsFeatured = query.isFeatured;

    const setUrl = () => {
        replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || "",
            },
        });
    };

    const setUrlExplore = () => {
        replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                category: currentCategory || "",
                isOnline: currentIsOnline || "",
                isFeatured: currentIsFeatured || "",
            },
        });
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

    const handleChangeCategory = (category: string) => {
        push({
            query: {
                ...query,
                category,
                page: PAGE_DEFAULT,
            },
        });
    };
    const handleChangeIsOnline = (isOnline: string) => {
        push({
            query: {
                ...query,
                isOnline,
                page: PAGE_DEFAULT,
            },
        });
    };
    const handleChangeIsFeatured = (isFeatured: string) => {
        push({
            query: {
                ...query,
                isFeatured,
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
        }, DELAY);
    };

    const handleClearSearch = () => {
        push({
            query: {
                ...query,
                search: "",
                page: PAGE_DEFAULT,
            },
        });
    };

    return {
        currentCategory,
        currentIsFeatured,
        currentIsOnline,
        currentLimit,
        currentPage,
        currentSearch,
        handleChangeCategory,
        handleChangeIsFeatured,
        handleChangeIsOnline,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
        setUrl,
        setUrlExplore,
    };
};

export default useChangeURL;
