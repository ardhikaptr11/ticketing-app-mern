import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteTicketModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteTicket = async (id: string) => {
        await ticketServices.deleteTicket(id);
    };

    const {
        mutate: mutateDeleteTicket,
        isPending: isPendingMutateDeleteTicket,
        isSuccess: isSuccessMutateDeleteTicket,
    } = useMutation({
        mutationFn: deleteTicket,
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
                message: "Ticket successfully deleted",
            });
        },
    });

    return {
        mutateDeleteTicket,
        isPendingMutateDeleteTicket,
        isSuccessMutateDeleteTicket,
    };
};

export default useDeleteTicketModal;
