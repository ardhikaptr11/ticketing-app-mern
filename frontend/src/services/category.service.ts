import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
    getCategories: (params?: string) =>
        instance.get(`${endpoint.CATEGORY}?${params}`),
    addCategory: (payload: ICategory) =>
        instance.post(endpoint.CATEGORY, payload),
    deleteCategory: (id: string) =>
        instance.delete(`${endpoint.CATEGORY}/${id}`),
};

export default categoryServices;
