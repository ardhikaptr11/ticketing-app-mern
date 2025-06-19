import { getSession } from "next-auth/react";
import environment from "../../config/environment";
import axios from "axios";
import { SessionExtended } from "@/types/Auth";

const headers = {
    "Content-Type": "application/json",
};

const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000,
});

instance.interceptors.request.use(
    async (request) => {
        const session: SessionExtended | null = await getSession();

        if (session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        return request;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (request) => request,
    (error) => Promise.reject(error),
);

export default instance;
