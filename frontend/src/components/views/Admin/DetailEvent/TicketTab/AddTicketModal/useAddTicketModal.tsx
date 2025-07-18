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

const addTicketSchema = yup.object().shape({
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
        .typeError("Quantity cannot be empty (min: 1)")
        .integer("Quantity must be a valid integer number")
        .moreThan(0, "Quantity must be bigger than 0")
        .required("Ticket quantity is required"),
});

const useAddTicketModal = () => {
    const { setToaster } = useContext(ToasterContext);
    const { query } = useRouter();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(addTicketSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            quantity: 1,
        },
    });

    const handleOnClose = (onClose: () => void) => {
        reset();
        onClose();
    };

    const addTicket = async (payload: ITicket) => {
        const res = await ticketServices.addTicket({
            ...payload,
            events: `${query.id}`,
        });

        return res;
    };

    const {
        mutate: mutateAddTicket,
        isPending: isPendingMutateAddTicket,
        isSuccess: isSuccessMutateAddTicket,
    } = useMutation({
        mutationFn: addTicket,
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

    const handleAddTicket = (data: ITicket) => mutateAddTicket(data);

    return {
        control,
        errors,
        handleSubmitForm,
        handleAddTicket,
        handleOnClose,
        isPendingMutateAddTicket,
        isSuccessMutateAddTicket,
    };
};

export default useAddTicketModal;
