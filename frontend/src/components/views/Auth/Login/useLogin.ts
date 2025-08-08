import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { ILogin } from "@/types/Auth";
import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
    identifier: yup
        .string()
        .required("Please enter your email or username")
        .test(
            "is-email-or-username",
            "Invalid username or email format",
            function (value) {
                if (!value) return false;

                const looksLikeEmail = /^[\w].*@/.test(value);
                const isEmailValid = yup.string().email().isValidSync(value);
                const isUsernameValid =
                    !looksLikeEmail && value.trim().length > 0;

                return isEmailValid || isUsernameValid;
            },
        ),
    password: yup
        .string()
        .min(8, "Password at least contain 8 characters")
        .required("Please enter your password"),
});

const useLogin = () => {
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);

    const handleVisiblePassword = () => setIsVisible(!isVisible);
    const { setToaster } = useContext(ToasterContext);

    const callbackUrl: string = (router.query.callbackUrl as string) || "/";

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl,
        });

        if (result?.error && result?.status === 401) {
            throw new Error("Invalid username or password");
        }

        return result;
    };

    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError: () => {
            setToaster({
                type: "error",
                message: "Invalid login credentials",
            });
        },
        onSuccess: () => {
            reset();
            setToaster({
                type: "success",
                message: "Login success!",
                afterLoginSuccess: true,
            });
            router.push(callbackUrl);
        },
    });

    const handleLogin = (data: ILogin) => mutateLogin(data);

    return {
        isVisible,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    };
};

export default useLogin;
