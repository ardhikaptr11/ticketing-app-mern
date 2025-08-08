import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const updateTicketSchema = yup.object().shape({
    name: yup.string().required("Ticket name is required"),
    description: yup.string().required("Ticket description is required"),
    price: yup
        .number()
        .typeError("Price cannot be empty (min: Rp. 0)")
        .integer("Price must be a valid integer number")
        .min(0, "Price must be a positive integer number")
        .required("Ticket price is required"),
    quantity: yup
        .number()
        .typeError("Quantity cannot be empty (min: 0)")
        .integer("Quantity must be a valid integer number")
        .min(0, "Quantity must be a positive integer number")
        .required("Ticket quantity is required"),
});

const useUpdateTicketModal = (ticketId: string) => {
    const { isReady } = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        setValue: setValueUpdateTicketModal,
    } = useForm({
        resolver: yupResolver(updateTicketSchema),
    });

    const getTicketById = async (id: string) => {
        const { data } = await ticketServices.getTicketById(id);
        return data.data;
    };

    const { data: dataTicket } = useQuery({
        queryKey: ["Ticket", ticketId],
        queryFn: () => getTicketById(ticketId),
        enabled: isReady && !!ticketId,
    });

    const updateTicket = async (payload: ITicket) => {
        const res = await ticketServices.updateTicket(ticketId, payload);

        return res;
    };

    const handleOnClose = (onClose: () => void) => {
        reset({
            name: dataTicket?.name,
            description: dataTicket?.description,
            price: dataTicket?.price,
            quantity: dataTicket?.quantity,
        });
        onClose();
    };

    const {
        mutate: mutateUpdateTicket,
        isPending: isPendingMutateUpdateTicket,
        isSuccess: isSuccessMutateUpdateTicket,
    } = useMutation({
        mutationFn: updateTicket,
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;

            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            reset();
            setToaster({
                type: "success",
                message: "Ticket successfully added",
            });
        },
    });

    const handleUpdateTicket = async (data: ITicket) => {
        const inputToCompare = [
            "name",
            "description",
            "price",
            "quantity",
        ] as const;

        const prevData = await getTicketById(ticketId);

        const isEqual = inputToCompare.every(
            (item) => prevData[item] === data[item],
        );

        if (isEqual)
            return setToaster({
                type: "error",
                message: "At least one field must be changed",
            });

        mutateUpdateTicket(data);
    };

    return {
        control,
        dataTicket,
        errors,
        handleSubmitForm,
        handleUpdateTicket,
        handleOnClose,
        isPendingMutateUpdateTicket,
        isSuccessMutateUpdateTicket,
        setValueUpdateTicketModal,
    };
};

export default useUpdateTicketModal;
