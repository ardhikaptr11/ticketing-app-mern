import { ToasterContext } from "@/contexts/ToasterContext";
import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteTransactionModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteTransaction = async (id: string) => await orderServices.deleteOrder(id)

    const {
        mutate: mutateDeleteTransaction,
        isPending: isPendingMutateDeleteTransaction,
        isSuccess: isSuccessMutateDeleteTransaction,
    } = useMutation({
        mutationFn: deleteTransaction,
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;
            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Transaction successfully deleted",
            });
        },
    });

    return {
        mutateDeleteTransaction,
        isPendingMutateDeleteTransaction,
        isSuccessMutateDeleteTransaction,
    };
};

export default useDeleteTransactionModal;
