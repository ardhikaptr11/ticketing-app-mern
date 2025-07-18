import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBannerImage = yup.object().shape({
    image: yup.mixed<FileList | string>().required("Image is required"),
});

const useImageTab = (currentImage: string) => {
    const [isDeleteDirectly, setIsDeleteDirectly] = useState(false);

    const {
        control: controlUpdateBannerImage,
        handleSubmit,
        formState: { errors: errorsUpdateBannerImage },
        reset: resetUpdateBannerImage,
        watch: watchUpdateBannerImage,
        getValues: getValuesUpdateBannerImage,
        setValue: setValueUpdateBannerImage,
    } = useForm({
        resolver: yupResolver(schemaUpdateBannerImage),
    });

    const {
        handleDeleteFile,
        handleUploadFile,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
    } = useMediaHandling();

    const preview = watchUpdateBannerImage("image");
    const fileURL = getValuesUpdateBannerImage("image");

    const initialImageRef = useRef<string | null>(null);
    const onUpdateRef = useRef<((data: any) => void) | null>(null);

    const setInitialImage = (initialImage: string) => {
        initialImageRef.current = initialImage;
    };

    useEffect(() => {
        setInitialImage(currentImage);
    }, [currentImage]);

    useEffect(() => {
        const tempURL = sessionStorage.getItem("temp_uploaded_image");
        const status = sessionStorage.getItem("uploaded_image_status");

        if (tempURL && status !== "saved") {
            handleDeleteFile(tempURL, () => {
                sessionStorage.removeItem("temp_uploaded_image");
                sessionStorage.removeItem("uploaded_image_status");
            });
        }
    }, []);

    const setOnUpdateBannerImage = (cb: (data: any) => void) => {
        onUpdateRef.current = cb;
    };

    const handleUploadImage = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileURL: string | undefined) => {
            if (fileURL) {
                setValueUpdateBannerImage("image", fileURL);

                sessionStorage.setItem("temp_uploaded_image", fileURL);
                sessionStorage.setItem("uploaded_image_status", "unsaved");
            }
        });
    };

    const handleDeleteImage = (
        onChange: (files: FileList | undefined) => void,
        setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void,
    ) => {
        setIsDeleteDirectly(true);
        handleDeleteFile(fileURL, () => {
            onChange(undefined);

            setHasUnsavedChanges(false);
            setIsDeleteDirectly(false);

            sessionStorage.removeItem("temp_uploaded_image");
            sessionStorage.removeItem("uploaded_image_status");
        });
    };

    const handleSubmitUpdateBannerImage = handleSubmit((data) => {
        sessionStorage.removeItem("temp_uploaded_image");

        const oldImage = initialImageRef.current;
        const newImage = data.image;

        const isChanged =
            typeof oldImage === "string" &&
            typeof newImage === "string" &&
            oldImage !== newImage;

        sessionStorage.setItem("uploaded_image_status", "saved");

        if (isChanged) {
            handleDeleteFile(oldImage, () => onUpdateRef.current?.(data));
            sessionStorage.removeItem("temp_uploaded_image");
            sessionStorage.removeItem("uploaded_image_status");
        }
    });

    return {
        controlUpdateBannerImage,
        errorsUpdateBannerImage,
        handleDeleteImage,
        handleSubmitUpdateBannerImage,
        handleUploadImage,
        isDeleteDirectly,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        resetUpdateBannerImage,
        setOnUpdateBannerImage,
    };
};

export default useImageTab;
