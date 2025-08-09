import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TRANSACTIONS } from "./Transactions.constants";
import useTransactions from "./useTransactions";
import DeleteTransactionModal from "./DeleteTransactionModal";
import DropdownAction from "@/components/commons/DropdownAction";
import {
    ALLOWED_LIMITS,
    LIMIT_DEFAULT,
    PAGE_DEFAULT,
} from "@/constants/list.constants";
import { convertToIDR } from "@/utils/currency";
import { IoTrashOutline, IoWallet } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";

import { TbBasketCancel } from "react-icons/tb";
import useChangeURL from "@/hooks/useChangeURL";
import {
    FaRegCircleCheck,
    FaRegCircleXmark,
    FaRegClock,
} from "react-icons/fa6";

const Transactions = () => {
    const { isReady, push, query, replace } = useRouter();

    const { currentLimit, currentSearch, setUrl } = useChangeURL();

    const {
        dataOrdersHistory,
        getColorStatus,
        isLoadingOrdersHistory,
        isRefetchingOrdersHistory,
        refetchTransactions,
        selectedId,
        setSelectedId,
    } = useTransactions();

    useEffect(() => {
        if (isReady) {
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

            setUrl();
        }
    }, [isReady]);

    const deleteTransactionModal = useDisclosure();

    const getListOfActions = (data: Record<string, unknown>) => {
        switch (data.status) {
            case "completed":
                return [
                    {
                        name: "detail",
                        startContent: (
                            <RiInformationLine className="text-medium" />
                        ),
                        action: () =>
                            push(`/member/transactions/${data.orderId}`),
                    },
                ];
            case "cancelled":
                return [
                    {
                        name: "delete",
                        startContent: (
                            <IoTrashOutline className="text-medium" />
                        ),
                        action: () => {
                            setSelectedId(`${data.orderId}`);
                            deleteTransactionModal.onOpen();
                        },
                    },
                ];
            default:
                return [
                    {
                        name: "pay",
                        startContent: <IoWallet className="text-medium" />,
                        action: () =>
                            push(
                                `${(data.payment as Record<string, string>).redirect_url}`,
                            ),
                    },
                    {
                        name: "cancel",
                        startContent: (
                            <TbBasketCancel className="text-medium" />
                        ),
                        action: () =>
                            push(
                                `/payment?order_id=${data.orderId}&status_code=200&transaction_status=cancelled`,
                            ),
                    },
                ];
        }
    };

    const decideStartContent = (status: string) => {
        switch (status) {
            case "completed":
                return <FaRegCircleCheck />;
            case "cancelled":
                return <FaRegCircleXmark />;
            default:
                return <FaRegClock />;
        }
    };

    const renderCell = useCallback(
        (orderHistory: Record<string, unknown>, columnKey: Key) => {
            const cellValue =
                orderHistory[columnKey as keyof typeof orderHistory];

            const listOfActions = getListOfActions(orderHistory);

            switch (columnKey) {
                case "total":
                    return convertToIDR(cellValue as number);
                case "status":
                    return (
                        <Chip
                            color={getColorStatus(cellValue as string)}
                            size="sm"
                            variant="flat"
                            className="flex items-center gap-1 capitalize leading-none"
                            startContent={decideStartContent(
                                cellValue as string,
                            )}
                        >
                            {cellValue === "pending" || cellValue === undefined
                                ? "Pending"
                                : (cellValue as string)}
                        </Chip>
                    );
                case "actions":
                    return (
                        <DropdownAction listOfActions={listOfActions ?? []} />
                    );
                default:
                    return cellValue as ReactNode;
            }
        },
        [push],
    );

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    columns={COLUMN_LIST_TRANSACTIONS}
                    data={dataOrdersHistory?.data || []}
                    emptyContent="Orders is empty"
                    isLoading={
                        isLoadingOrdersHistory || isRefetchingOrdersHistory
                    }
                    renderCell={renderCell}
                    totalPages={dataOrdersHistory?.pagination.totalPages}
                />
            )}
            <DeleteTransactionModal
                refetchTransactions={refetchTransactions}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                {...deleteTransactionModal}
            />
        </section>
    );
};

export default Transactions;
