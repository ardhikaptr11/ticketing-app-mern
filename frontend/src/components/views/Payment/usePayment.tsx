import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePayment = () => {
    const {
        query: { order_id, transaction_status },
    } = useRouter();

    const updateOrderStatus = async () =>
        await orderServices.updatePaymentStatus(
            `${order_id}`,
            normalizeStatus(`${transaction_status}`),
        );

    const normalizeStatus = (status: string) => {
        switch (status) {
            case "settlement":
                return "completed";
            case "cancel":
                return "cancelled";
            default:
                return status;
        }
    };

    const getStatusMessage = (status: string) => {
        switch (status) {
            case "settlement":
                return "Thank you for making payment at Zentix";
            case "pending":
                return "Make payment immediately to get your ticket";
            case "cancel":
                return "We are sorry, your payment has been cancelled";
            default:
                break;
        }
    };

    const statusMessage = getStatusMessage(`${transaction_status}`);

    const { mutate: mutateUpdateOrderStatus } = useMutation({
        mutationFn: updateOrderStatus,
    });

    return { mutateUpdateOrderStatus, statusMessage, normalizeStatus };
};

export default usePayment;
