import {
    ALLOWED_LIMITS,
    DELAY,
    LIMIT_DEFAULT,
    PAGE_DEFAULT,
} from "@/constants/list.constants";
import { useRouter } from "next/router";
import { useDebounce } from "./useDebounce";
import { ChangeEvent, useEffect } from "react";

const useChangeURL = (isDisabled: boolean) => {

    const { isReady, push, query, replace } = useRouter();
    const debounce = useDebounce();

    const currentLimit = query.limit;
    const currentPage = query.page;
    const currentSearch = query.search;

    useEffect(() => {
        if (isReady && !isDisabled) {
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
        }
    }, [isReady]);

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
        currentLimit,
        currentPage,
        currentSearch,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    };
};

export default useChangeURL;
