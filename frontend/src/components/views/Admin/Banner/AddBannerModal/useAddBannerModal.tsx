import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addBannerSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    isShow: yup.string().required("Please select one of the options"),
    image: yup.mixed<FileList | string>().required("Banner image is required"),
});

const useAddBannerModal = () => {
    const { setToaster } = useContext(ToasterContext);
    const {
        handleDeleteFile,
        handleUploadFile,
        isPendingMutateUploadFile,
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
        resolver: yupResolver(addBannerSchema),
    });

    const preview = watch("image");
    const fileURL = getValues("image");

    const handleUploadImage = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileURL: string | undefined) => {
            if (fileURL) {
                setValue("image", fileURL);
                sessionStorage.setItem("temp_uploaded_image", fileURL);
            }
        });
    };

    useEffect(() => {
        const tempURL = sessionStorage.getItem("temp_uploaded_image");

        if (tempURL) {
            handleDeleteFile(tempURL, () =>
                sessionStorage.removeItem("temp_uploaded_image"),
            );
        }
    }, []);

    const handleDeleteImage = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleDeleteFile(fileURL, () => onChange(undefined));
    };

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileURL, () => {
            reset();
            onClose();
        });
    };

    const addBanner = async (payload: IBanner) => {
        sessionStorage.removeItem("temp_uploaded_image");
        const res = await bannerServices.addBanner(payload);

        return res;
    };

    const {
        mutate: mutateAddBanner,
        isPending: isPendingMutateAddBanner,
        isSuccess: isSuccessMutateAddBanner,
    } = useMutation({
        mutationFn: addBanner,
        onError: (error: AxiosError<{ meta: { message: string } }>) => {
            const message = error.response!.data.meta.message;

            setToaster({
                type: "error",
                message,
            });
        },
        onSuccess: () => {
            reset();
            setToaster({
                type: "success",
                message: "Banner successfully added",
            });
        },
    });

    const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

    return {
        control,
        errors,
        handleSubmitForm,
        handleAddBanner,
        handleDeleteImage,
        handleOnClose,
        handleUploadImage,
        isPendingMutateAddBanner,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        isSuccessMutateAddBanner,
        preview,
    };
};

export default useAddBannerModal;
