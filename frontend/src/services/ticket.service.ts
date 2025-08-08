import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";

const ticketServices = {
    getTickets: (params?: string) =>
        instance.get(`${endpoint.TICKET}?${params}`),
    getTicketById: (id: string) => instance.get(`${endpoint.TICKET}/${id}`),
    addTicket: (payload: ITicket) => instance.post(endpoint.TICKET, payload),
    updateTicket: (id: string, payload: ITicket) =>
        instance.put(`${endpoint.TICKET}/${id}`, payload),
    deleteTicket: (id: string) => instance.delete(`${endpoint.TICKET}/${id}`),
    getTicketsByEventId: (eventId: string) =>
        instance.get(`${endpoint.TICKET}/${eventId}/events`),
};

export default ticketServices;
