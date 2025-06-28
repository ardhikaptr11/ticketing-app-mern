import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Category name is required"),
    description: yup.string().required("Category description is required"),
    icon: yup.mixed<FileList | string>().required("Category icon is required"),
});

const useAddCategoryModal = () => {
    const { setToaster } = useContext(ToasterContext);
    const {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const preview = watch("icon");

    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        if (files.length !== 0) {
            onChange(files);
            mutateUploadFile({
                file: files[0],
                callback: (fileURL: string) => {
                    setValue("icon", fileURL);
                    sessionStorage.setItem("temp_uploaded_icon", fileURL);
                },
            });
        }
    };

    useEffect(() => {
        const tempURL = sessionStorage.getItem("temp_uploaded_icon");

        if (tempURL) {
            mutateDeleteFile({
                fileURL: tempURL,
                callback: () => sessionStorage.removeItem("temp_uploaded_icon"),
            });
        }
    }, []);

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        const fileURL = getValues("icon");

        if (typeof fileURL === "string") {
            mutateDeleteFile({
                fileURL,
                callback: () => onChange(undefined),
            });
        }
    };

    const handleOnClose = (onClose: () => void) => {
        const fileURL = getValues("icon");
        if (typeof fileURL === "string") {
            mutateDeleteFile({
                fileURL,
                callback: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            reset();
            onClose();
        }
    };

    const addCategory = async (payload: ICategory) => {
        sessionStorage.removeItem("temp_uploaded_icon");
        const res = await categoryServices.addCategory(payload);

        return res;
    };

    const {
        mutate: mutateAddCategory,
        isPending: isPendingMutateAddCategory,
        isSuccess: isSuccessMutateAddCategory,
    } = useMutation({
        mutationFn: addCategory,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            reset();
            setToaster({
                type: "success",
                message: "Category successfully added",
            });
        },
    });

    const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

    return {
        control,
        errors,
        handleSubmitForm,
        handleAddCategory,
        handleDeleteIcon,
        handleOnClose,
        handleUploadIcon,
        isPendingMutateAddCategory,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        isSuccessMutateAddCategory,
        preview,
        reset,
    };
};

export default useAddCategoryModal;
