import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateEventBanner = yup.object().shape({
    banner: yup.mixed<FileList | string>().required("Banner is required"),
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
        const status = sessionStorage.getItem("uploaded_banner_status");

        if (tempURL && status !== "saved") {
            handleDeleteFile(tempURL, () => {
                sessionStorage.removeItem("temp_uploaded_banner");
                sessionStorage.removeItem("uploaded_banner_status");
            });
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
                sessionStorage.setItem("uploaded_banner_status", "unsaved");
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

            sessionStorage.removeItem("temp_uploaded_banner");
            sessionStorage.removeItem("uploaded_banner_status");
        });
    };

    const handleSubmitUpdateEventBanner = handleSubmit((data) => {
        sessionStorage.removeItem("temp_uploaded_banner");

        const oldBanner = initialBannerRef.current;
        const newBanner = data.banner;

        const isChanged =
            typeof oldBanner === "string" &&
            typeof newBanner === "string" &&
            oldBanner !== newBanner;

        sessionStorage.setItem("uploaded_banner_status", "saved");

        if (isChanged)
            handleDeleteFile(oldBanner, () => {
                onUpdateRef.current?.(data);
                sessionStorage.removeItem("temp_uploaded_banner");
                sessionStorage.removeItem("uploaded_banner_status");
            });
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
