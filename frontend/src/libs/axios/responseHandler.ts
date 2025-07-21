import { ModalContext } from "@/contexts/ModalContext";
import { ErrorResponseData } from "@/types/Response";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { useContext } from "react";

export const onErrorHandler = (error: Error) => {
    const { response } = error as AxiosError;
    const data = response?.data as ErrorResponseData;

    if (response && data?.data?.name === "TokenExpiredError") {
        window.dispatchEvent(new CustomEvent("sessionExpired"));
        return;
    }
};
