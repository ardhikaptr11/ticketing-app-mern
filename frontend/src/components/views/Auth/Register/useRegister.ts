import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { AxiosError } from "axios";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("Please enter your full name"),
    username: yup
        .string()
        .required("Please enter your username")
        .test("is-username-valid", "Invalid username format", function (value) {
            if (!value) return false;

            const isUsernameValid = /^[^@]+$/.test(value);

            return isUsernameValid && value.trim().length > 0;
        }),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Password at least contain 8 characters")
        .required("Please enter your password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match")
        .required("Please enter your confirmation password"),
});

const useRegister = () => {
    const router = useRouter();

    const [isVisible, setIsVisible] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleVisiblePassword = (key: "password" | "confirmPassword") => {
        setIsVisible({
            ...isVisible,
            [key]: !isVisible[key],
        });
    };

    const { setToaster } = useContext(ToasterContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<IRegister>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            fullName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);

        return result;
    };

    const { mutate: mutateRegister, isPending: isPendingRegister } =
        useMutation({
            mutationFn: registerService,
            onError: (
                error: AxiosError<{
                    meta: { message: string };
                }>,
            ) => {
                const errorMessage = error.response!.data.meta.message;

                const message = errorMessage.includes("E11000")
                    ? "User is already registered"
                    : errorMessage;

                setToaster({
                    type: "error",
                    message,
                });
            },
            onSuccess: () => {
                reset();
                setToaster({
                    type: "success",
                    message: "Registration success!",
                });
                router.push("/auth/register/success");
            },
        });

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        isVisible,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors,
    };
};

export default useRegister;
