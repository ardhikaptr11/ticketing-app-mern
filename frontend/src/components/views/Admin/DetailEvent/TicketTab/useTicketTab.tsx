import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

import ticketServices from "@/services/ticket.service";

export const useTicketTab = () => {
    const [selectedId, setSelectedId] = useState("");
    const { query, isReady } = useRouter();

    const getTicketsByEventId = async () => {
        const { data } = await ticketServices.getTicketsByEventId(
            `${query.id}`,
        );
        return data.data;
    };

    const {
        data: dataTickets,
        refetch: refetchTicket,
        isPending: isPendingTicket,
        isRefetching: isRefetchingTicket,
    } = useQuery({
        queryKey: ["Tickets"],
        queryFn: getTicketsByEventId,
        enabled: isReady,
    });

    return {
        dataTickets,
        refetchTicket,
        isPendingTicket,
        isRefetchingTicket,
        selectedId,
        setSelectedId,
    };
};
