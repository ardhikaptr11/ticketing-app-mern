import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useState } from "react";

const useDetailTransaction = () => {
    const {
        isReady,
        query: { id },
    } = useRouter();

    const [qrCode, setQrCode] = useState<string | null>(null);

    const opts = {
        errorCorrectionLevel: "L",
        type: "image/webp",
        margin: 1,
        color: {
            dark: "#000000",
            light: "#ffffff",
        },
    } as QRCode.QRCodeToDataURLOptions;

    const generateQR = async (text: string) => {
        try {
            return await QRCode.toDataURL(text, opts);
        } catch (err) {
            console.error(err);
        }
    };

    const getOrderById = async () => {
        const { data } = await orderServices.getOrderById(`${id}`);

        return data.data;
    };

    const { data: dataTransaction } = useQuery({
        queryKey: ["Transaction"],
        queryFn: getOrderById,
        enabled: isReady,
    });

    const getEventById = async () => {
        const { data } = await eventServices.getEventById(
            `${dataTransaction?.event}`,
        );

        return data.data;
    };

    const { data: dataEvent } = useQuery({
        queryKey: ["EventById"],
        queryFn: getEventById,
        enabled: !!dataTransaction?.event,
    });

    const getTicketById = async () => {
        const dataTickets: ITicket[] = [];

        for (const cart of dataTransaction?.tickets || []) {
            const { data } = await ticketServices.getTicketById(cart.ticket);
            dataTickets.push(data.data);
        }

        return dataTickets;
    };

    const { data: dataTickets, isLoading: isLoadingDataTickets } = useQuery({
        queryKey: ["Tickets"],
        queryFn: getTicketById,
        enabled: !!dataTransaction?.tickets?.[0].ticket,
    });

    const getAllCategories = async (tickets: ICart[]) => {
        const categories: string[] = [];

        for (const ticket of tickets) {
            const { data } = await ticketServices.getTicketById(
                `${ticket.ticket}`,
            );
            const {name } = data.data;

            for (let i = 0; i < ticket.quantity; i++) {
                categories.push(name);
            }
        }

        return categories;
    };

    return {
        dataTransaction,
        dataEvent,
        dataTickets,
        generateQR,
        getAllCategories,
        isLoadingDataTickets,
        setQrCode,
        qrCode,
    };
};

export default useDetailTransaction;
