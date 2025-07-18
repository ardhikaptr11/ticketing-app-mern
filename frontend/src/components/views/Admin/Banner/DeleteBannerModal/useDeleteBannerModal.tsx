import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteBannerModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteBannerAndFile = async ({
        id,
        image,
    }: {
        id: string;
        image: string;
    }) => {
        await bannerServices.deleteBanner(id);
        await uploadServices.deleteFile({ fileURL: image });
    };

    const {
        mutate: mutateDeleteBanner,
        isPending: isPendingMutateDeleteBanner,
        isSuccess: isSuccessMutateDeleteBanner,
    } = useMutation({
        mutationFn: deleteBannerAndFile,
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
                message: "Banner successfully deleted",
            });
        },
    });

    return {
        mutateDeleteBanner,
        isPendingMutateDeleteBanner,
        isSuccessMutateDeleteBanner,
    };
};

export default useDeleteBannerModal;
