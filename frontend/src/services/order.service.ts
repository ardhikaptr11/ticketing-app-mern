import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {
    createOrder: (payload: ICart[]) =>
        instance.post(`${endpoint.ORDER}`, payload),
    updatePaymentStatus: (id: string, status: string) =>
        instance.put(`${endpoint.ORDER}/${id}/${status}`),
    getOrdersHistory: (params: string) => instance.get(`${endpoint.ORDER}-history?${params}`),
    getOrderById: (id: string) => instance.get(`${endpoint.ORDER}/${id}`),
    deleteOrder: (id: string) => instance.delete(`${endpoint.ORDER}/${id}`)
};

export default orderServices;
