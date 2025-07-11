import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateCategoryIcon = yup.object().shape({
    icon: yup.mixed<FileList | string>().required("Icon is required"),
});

const useIconTab = (currentIcon: string) => {
    const [isDeleteDirectly, setIsDeleteDirectly] = useState(false);

    const {
        control: controlUpdateCategoryIcon,
        handleSubmit,
        formState: { errors: errorsUpdateCategoryIcon },
        reset: resetUpdateCategoryIcon,
        watch: watchUpdateCategoryIcon,
        getValues: getValuesUpdateCategoryIcon,
        setValue: setValueUpdateCategoryIcon,
    } = useForm({
        resolver: yupResolver(schemaUpdateCategoryIcon),
    });

    const {
        handleDeleteFile,
        handleUploadFile,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
    } = useMediaHandling();

    const preview = watchUpdateCategoryIcon("icon");
    const fileURL = getValuesUpdateCategoryIcon("icon");

    const initialIconRef = useRef<string | null>(null);
    const onUpdateRef = useRef<((data: any) => void) | null>(null);

    const setInitialIcon = (initialIcon: string) => {
        initialIconRef.current = initialIcon;
    };

    useEffect(() => {
        setInitialIcon(currentIcon);
    }, [currentIcon]);

    useEffect(() => {
        const tempURL = sessionStorage.getItem("temp_uploaded_icon");
        const status = sessionStorage.getItem("uploaded_icon_status");

        if (tempURL && status !== "saved") {
            handleDeleteFile(tempURL, () => {
                sessionStorage.removeItem("temp_uploaded_icon");
                sessionStorage.removeItem("uploaded_icon_status");
            });
        }
    }, []);

    const setOnUpdateCategoryIcon = (cb: (data: any) => void) => {
        onUpdateRef.current = cb;
    };

    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileURL: string | undefined) => {
            if (fileURL) {
                setValueUpdateCategoryIcon("icon", fileURL);

                sessionStorage.setItem("temp_uploaded_icon", fileURL);
                sessionStorage.setItem("uploaded_icon_status", "unsaved");
            }
        });
    };

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void,
        setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void,
    ) => {
        setIsDeleteDirectly(true);
        handleDeleteFile(fileURL, () => {
            onChange(undefined);

            setHasUnsavedChanges(false);
            setIsDeleteDirectly(false);

            sessionStorage.removeItem("temp_uploaded_icon");
            sessionStorage.removeItem("uploaded_icon_status");
        });
    };

    const handleSubmitUpdateCategoryIcon = handleSubmit((data) => {
        sessionStorage.removeItem("temp_uploaded_icon");

        const oldIcon = initialIconRef.current;
        const newIcon = data.icon;

        const isChanged =
            typeof oldIcon === "string" &&
            typeof newIcon === "string" &&
            oldIcon !== newIcon;

        sessionStorage.setItem("uploaded_icon_status", "saved");

        if (isChanged) {
            handleDeleteFile(oldIcon, () => onUpdateRef.current?.(data));
            sessionStorage.removeItem("temp_uploaded_icon");
            sessionStorage.removeItem("uploaded_icon_status");
        }
    });

    return {
        controlUpdateCategoryIcon,
        errorsUpdateCategoryIcon,
        handleDeleteIcon,
        handleSubmitUpdateCategoryIcon,
        handleUploadIcon,
        isDeleteDirectly,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        resetUpdateCategoryIcon,
        setOnUpdateCategoryIcon,
    };
};

export default useIconTab;
