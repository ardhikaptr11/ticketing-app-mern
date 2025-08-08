import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useProfile = () => {
    const { setToaster } = useContext(ToasterContext);

    const getUserProfile = async () => {
        const { data } = await authServices.getProfile();
        return data.data;
    };

    const {
        data: dataUserProfile,
        refetch: refetchProfile,
    } = useQuery({
        queryKey: ["Profile"],
        queryFn: getUserProfile,
    });

    const updateUserInfo = async (payload: IProfile) => {
        const { data } = await authServices.updateProfile(payload);
        return data.data;
    };

    const updateUserPassword = async (payload: IProfile) => {
        const { data } = await authServices.updatePassword(payload);
        return data.data;
    };

    const {
        mutate: mutateUpdateUserInfo,
        isPending: isPendingMutateUpdateUserInfo,
        isSuccess: isSuccessMutateUpdateUserInfo,
    } = useMutation({
        mutationFn: (payload: IProfile) => updateUserInfo(payload),
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;

            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            refetchProfile();
            setToaster({
                type: "success",
                message: "Profile successfully updated",
            });
        },
    });

    const {
        mutate: mutateUpdateUserPassword,
        isPending: isPendingMutateUpdateUserPassword,
        isSuccess: isSuccessMutateUpdateUserPassword,
    } = useMutation({
        mutationFn: (payload: IProfile) => updateUserPassword(payload),
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;

            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Your password successfully updated",
            });
        },
    });

    const handleUpdateUser = (data: IProfile) => mutateUpdateUserInfo(data);

    const handleUpdateUserInfo = async (payload: IProfile) => {
        const inputToCompare = "fullName" as const;

        const prevData = await getUserProfile();

        const isEqual = payload[inputToCompare] === prevData.fullName;

        if (isEqual)
            return setToaster({
                type: "error",
                message: "Field must be changed to update",
            });

        mutateUpdateUserInfo(payload);
    };

    const handleUpdateUserPassword = async (data: IProfile) => {
        const payload = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        };

        mutateUpdateUserPassword(payload);
    };

    return {
        dataUserProfile,
        handleUpdateUser,
        handleUpdateUserInfo,
        handleUpdateUserPassword,
        isPendingMutateUpdateUserInfo,
        isPendingMutateUpdateUserPassword,
        isSuccessMutateUpdateUserInfo,
        isSuccessMutateUpdateUserPassword,
    };
};

export default useProfile;
