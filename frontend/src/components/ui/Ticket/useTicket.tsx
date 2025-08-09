import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { ICart } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

const useTicket = () => {
    const { isReady, query } = useRouter();

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
        const { data } = await orderServices.getOrderById(`${query.id}`);

        return data.data;
    };

    const { data: dataTransaction } = useQuery({
        queryKey: ["Transaction"],
        queryFn: getOrderById,
        enabled: isReady,
    });

    const voucherIndex = dataTransaction?.vouchers?.findIndex(
        (v: { voucherId: string }) => v.voucherId === query.voucher,
    );

    const ticketIds: string[] = [];

    dataTransaction?.tickets.forEach((ticket: ICart) => {
        for (let i = 0; i < ticket.quantity; i++) {
            ticketIds.push(ticket.ticket);
        }
    });

    const ticketId = ticketIds[voucherIndex];

    const getTicketById = async () => {
        const { data } = await ticketServices.getTicketById(ticketId);

        return data.data;
    };

    const { data: dataTicket } = useQuery({
        queryKey: ["Ticket"],
        queryFn: getTicketById,
        enabled: !!ticketId,
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

    return { dataTicket, dataEvent, qrCode, voucherIndex };
};

export default useTicket;
