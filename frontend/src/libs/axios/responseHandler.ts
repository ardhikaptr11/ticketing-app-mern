import { ErrorResponseData } from "@/types/Response";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

export const onErrorHandler = (error: Error) => {
    const { response } = error as AxiosError;
    const data = response?.data as ErrorResponseData;

    if (response && data?.data?.name === "TokenExpiredError")
        signOut({ redirect: false, callbackUrl: "/auth/login" });
};
