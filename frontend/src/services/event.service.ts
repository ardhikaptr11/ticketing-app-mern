import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";
import axios from "axios";
import environment from "@/config/environment";

const eventServices = {
    getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
    getEventById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
    addEvent: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
    updateEvent: (id: string, payload: IEvent) =>
        instance.put(`${endpoint.EVENT}/${id}`, payload),
    deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
    searchLocationByRegency: (name: string) =>
        instance.get(`${endpoint.REGION}-search?name=${name}`),
    getRegencyById: (id: string) =>
        instance.get(`${endpoint.REGION}/${id}/regency`),
    getGeolocationByRegency: (name: string) =>
        axios.get(
            `${environment.GEOCODING_API_URL}/${encodeURIComponent(name)}?key=${environment.GOOGLE_API_KEY}`,
        ),
};

export default eventServices;
