import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteCategoryModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteCategoryAndFile = async ({
        id,
        icon,
    }: {
        id: string;
        icon: string;
    }) => {
        await categoryServices.deleteCategory(id);
        await uploadServices.deleteFile({ fileURL: icon });
    };

    const {
        mutate: mutateDeleteCategory,
        isPending: isPendingMutateDeleteCategory,
        isSuccess: isSuccessMutateDeleteCategory,
    } = useMutation({
        mutationFn: deleteCategoryAndFile,
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
                message: "Category successfully deleted",
            });
        },
    });

    return {
        mutateDeleteCategory,
        isPendingMutateDeleteCategory,
        isSuccessMutateDeleteCategory,
    };
};

export default useDeleteCategoryModal;
