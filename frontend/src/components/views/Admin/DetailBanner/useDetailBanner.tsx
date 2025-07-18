import { ToasterContext } from "@/contexts/ToasterContext";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailBanner = () => {
    const { query, isReady } = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const getQueryById = async () => {
        const { data } = await bannerServices.getBannerById(`${query.id}`);
        return data.data;
    };

    const { data: dataBanner, refetch: refetchBanner } = useQuery({
        queryKey: ["Banner"],
        queryFn: getQueryById,
        enabled: isReady,
    });

    const updateBanner = async (payload: IBanner) => {
        const { data } = await bannerServices.updateBanner(
            `${query.id}`,
            payload,
        );
        return data.data;
    };

    const {
        mutate: mutateUpdateBannerInfo,
        isPending: isPendingMutateUpdateBannerInfo,
        isSuccess: isSuccessMutateUpdateBannerInfo,
    } = useMutation({
        mutationFn: (payload: IBanner) => updateBanner(payload),
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;

            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            refetchBanner();
            setToaster({
                type: "success",
                message: "Banner successfully updated",
            });
        },
    });

    const handleUpdateBannerInfo = async (data: IBanner) => {
        const inputToCompare = ["title", "isShow"] as const;

        const prevData = await getQueryById();

        const payload = {
            ...data,
            isShow: data.isShow === "true" ? true : false,
        };

        const isEqual = inputToCompare.every(
            (item) => payload[item] === prevData[item],
        );

        if (isEqual)
            return setToaster({
                type: "error",
                message: "At least one field must be changed",
            });

        mutateUpdateBannerInfo(payload);
    };

    return {
        dataBanner,
        handleUpdateBannerInfo,
        isPendingMutateUpdateBannerInfo,
        isSuccessMutateUpdateBannerInfo,
    };
};

export default useDetailBanner;
