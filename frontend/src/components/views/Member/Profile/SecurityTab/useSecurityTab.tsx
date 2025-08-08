import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateProfilePassword = yup.object().shape({
    currentPassword: yup
        .string()
        .required("Please enter your current password"),
    newPassword: yup
        .string()
        .min(8, "Password at least contain 8 characters")
        .required("Please enter your new password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Password does not match")
        .required("Please enter your confirmation password"),
});

const usePasswordTab = () => {
    const [isVisible, setIsVisible] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const handleVisiblePassword = (
        key: "currentPassword" | "newPassword" | "confirmPassword",
    ) => {
        setIsVisible({
            ...isVisible,
            [key]: !isVisible[key],
        });
    };

    const {
        control: controlUpdateProfilePassword,
        handleSubmit: handleSubmitUpdateProfilePassword,
        formState: { errors: errorsUpdateProfilePassword },
        reset: resetUpdateProfilePassword,
    } = useForm({
        resolver: yupResolver(schemaUpdateProfilePassword),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    return {
        controlUpdateProfilePassword,
        errorsUpdateProfilePassword,
        handleSubmitUpdateProfilePassword,
        handleVisiblePassword,
        isVisible,
        resetUpdateProfilePassword,
    };
};

export default usePasswordTab;
