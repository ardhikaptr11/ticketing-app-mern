import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

const useDetailTransaction = () => {
    const {
        isReady,
        query: { id },
    } = useRouter();

    const [dataCategories, setDataCategories] = useState<string[]>([]);
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

    useEffect(() => {
        const fetchQR = async () => {
            const dataUrl = await generateQR(
                "https://zentix-kappa.vercel.app/",
            );
            if (dataUrl) setQrCode(dataUrl);
        };

        fetchQR();
    }, []);

    const getOrderById = async () => {
        const { data } = await orderServices.getOrderById(`${id}`);

        return data.data;
    };

    const { data: dataTransaction } = useQuery({
        queryKey: ["Transaction", id],
        queryFn: getOrderById,
        enabled: isReady && !!id,
    });

    const getEventById = async () => {
        const { data } = await eventServices.getEventById(
            `${dataTransaction?.event}`,
        );

        return data.data;
    };

    const { data: dataEvent } = useQuery({
        queryKey: ["EventById", dataTransaction?.event],
        queryFn: getEventById,
        enabled: !!dataTransaction?.event,
    });

    const getTicketById = async () => {
        const tickets: ITicket[] = [];

        for (const cart of dataTransaction?.tickets || []) {
            const { data } = await ticketServices.getTicketById(cart.ticket);
            tickets.push(data.data);
        }

        return tickets;
    };

    const { data: dataTickets, isLoading: isLoadingDataTickets } = useQuery({
        queryKey: ["Tickets"],
        queryFn: getTicketById,
        enabled:
            !!dataTransaction?.tickets && dataTransaction.tickets.length > 0,
    });

    const getAllCategories = async (tickets: ICart[]) => {
        const categories: string[] = [];

        for (const ticket of tickets) {
            const { data } = await ticketServices.getTicketById(
                `${ticket.ticket}`,
            );
            const { name } = data.data;

            for (let i = 0; i < ticket.quantity; i++) {
                categories.push(name);
            }
        }

        return categories;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            if (!dataTransaction?.tickets?.length) return;

            const categories = await getAllCategories(dataTransaction.tickets);
            setDataCategories(categories);
        };

        fetchCategories();
    }, [dataTransaction?.tickets]);

    return {
        dataCategories,
        dataEvent,
        dataTickets,
        dataTransaction,
        getAllCategories,
        isLoadingDataTickets,
        qrCode,
    };
};

export default useDetailTransaction;
