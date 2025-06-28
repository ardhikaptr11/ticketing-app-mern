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
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const preview = watchUpdateCategoryIcon("icon");

    const initialIconRef = useRef<string | null>(null);
    const onUpdateRef = useRef<((data: any) => void) | null>(null);

    const setInitialIcon = (initialIcon: string) => {
        initialIconRef.current = initialIcon;
    };

    useEffect(() => {
        setInitialIcon(currentIcon);
    }, [currentIcon]);

    const setOnUpdateCategoryIcon = (cb: (data: any) => void) => {
        onUpdateRef.current = cb;
    };

    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        if (files.length !== 0) {
            onChange(files);
            mutateUploadFile({
                file: files[0],
                callback: (fileURL: string) => {
                    setValueUpdateCategoryIcon("icon", fileURL);
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
        setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void,
    ) => {
        const fileURL = getValuesUpdateCategoryIcon("icon");

        if (typeof fileURL === "string") {
            setIsDeleteDirectly(true);
            mutateDeleteFile({
                fileURL,
                callback: () => {
                    onChange(undefined);
                    setHasUnsavedChanges(false);
                    setIsDeleteDirectly(false);
                },
            });
        }
    };

    const handleSubmitUpdateCategoryIcon = handleSubmit((data) => {
        console.log(data)
        sessionStorage.removeItem("temp_uploaded_icon");

        const oldIcon = initialIconRef.current;
        const newIcon = data.icon;

        const isChanged =
            typeof oldIcon === "string" &&
            typeof newIcon === "string" &&
            oldIcon !== newIcon;

        if (isChanged) {
            mutateDeleteFile({
                fileURL: oldIcon,
                callback: () => {
                    onUpdateRef.current?.(data);
                },
            });
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
