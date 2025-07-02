import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateEventBanner = yup.object().shape({
    banner: yup.mixed<FileList | string>().required("Icon is required"),
});

const useBannerTab = (currentBanner: string) => {
    const [isDeleteDirectly, setIsDeleteDirectly] = useState(false);

    const {
        control: controlUpdateEventBanner,
        handleSubmit,
        formState: { errors: errorsUpdateEventBanner },
        reset: resetUpdateEventBanner,
        watch: watchUpdateEventBanner,
        getValues: getValuesUpdateEventBanner,
        setValue: setValueUpdateEventBanner,
    } = useForm({
        resolver: yupResolver(schemaUpdateEventBanner),
    });

    const {
        handleDeleteFile,
        handleUploadFile,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
    } = useMediaHandling();

    const preview = watchUpdateEventBanner("banner");
    const fileURL = getValuesUpdateEventBanner("banner");

    const initialBannerRef = useRef<string | null>(null);
    const onUpdateRef = useRef<((data: any) => void) | null>(null);

    const setInitialBanner = (initialBanner: string) => {
        initialBannerRef.current = initialBanner;
    };

    useEffect(() => {
        setInitialBanner(currentBanner);
    }, [currentBanner]);

    useEffect(() => {
        const tempURL = sessionStorage.getItem("temp_uploaded_banner");

        if (tempURL) {
            handleDeleteFile(tempURL, () =>
                sessionStorage.removeItem("temp_uploaded_banner"),
            );
        }
    }, []);

    const setOnUpdateEventBanner = (cb: (data: any) => void) => {
        onUpdateRef.current = cb;
    };

    const handleUploadBanner = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileURL: string | undefined) => {
            if (fileURL) {
                setValueUpdateEventBanner("banner", fileURL);
                sessionStorage.setItem("temp_uploaded_banner", fileURL);
            }
        });
    };

    const handleDeleteBanner = (
        onChange: (files: FileList | undefined) => void,
        setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void,
    ) => {
        setIsDeleteDirectly(true);
        handleDeleteFile(fileURL, () => {
            onChange(undefined);
            setHasUnsavedChanges(false);
            setIsDeleteDirectly(false);
        });
    };

    const handleSubmitUpdateEventBanner = handleSubmit((data) => {
        sessionStorage.removeItem("temp_uploaded_icon");

        const oldIcon = initialBannerRef.current;
        const newIcon = data.banner;

        const isChanged =
            typeof oldIcon === "string" &&
            typeof newIcon === "string" &&
            oldIcon !== newIcon;

        if (isChanged)
            handleDeleteFile(oldIcon, () => onUpdateRef.current?.(data));
    });

    return {
        controlUpdateEventBanner,
        errorsUpdateEventBanner,
        handleDeleteBanner,
        handleSubmitUpdateEventBanner,
        handleUploadBanner,
        isDeleteDirectly,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        resetUpdateEventBanner,
        setOnUpdateEventBanner,
    };
};

export default useBannerTab;
