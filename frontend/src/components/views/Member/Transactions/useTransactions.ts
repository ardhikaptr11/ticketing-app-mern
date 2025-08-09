import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { Chip } from "@heroui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

import useChangeURL from "@/hooks/useChangeURL";
import orderServices from "@/services/order.service";

const useTransactions = () => {
    const [selectedId, setSelectedId] = useState("");
    const { isReady } = useRouter();

    const { currentLimit, currentPage, currentSearch, setUrl } = useChangeURL();

    const getColorStatus = (status: string) => {
        switch (status) {
            case "completed":
                return "success";
            case "cancelled":
                return "danger";
            default:
                return "warning";
        }
    };

    const getOrdersHistory = async () => {
        const params = currentSearch
            ? `page=${currentPage}&limit=${currentLimit}&search=${currentSearch}`
            : `page=${currentPage}&limit=${currentLimit}`;

        const res = await orderServices.getOrdersHistory(params);
        const { data } = res;

        return data;
    };

    const {
        data: dataOrdersHistory,
        isLoading: isLoadingOrdersHistory,
        isRefetching: isRefetchingOrdersHistory,
        refetch: refetchTransactions,
    } = useQuery({
        queryKey: ["OrdersHistory", currentPage, currentLimit, currentSearch],
        queryFn: getOrdersHistory,
        enabled: isReady && !!currentPage && !!currentLimit,
    });

    return {
        currentPage,
        currentLimit,
        currentSearch,
        dataOrdersHistory,
        getColorStatus,
        isLoadingOrdersHistory,
        isRefetchingOrdersHistory,
        refetchTransactions,
        selectedId,
        setSelectedId,
        setUrl,
    };
};

export default useTransactions;
