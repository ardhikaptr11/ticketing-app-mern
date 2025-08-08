import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateProfilePicture = yup.object().shape({
    profilePicture: yup.mixed<FileList | string>().required("Profile picture is required"),
});

const usePictureTab = (currentPicture: string) => {
    const [isDeleteDirectly, setIsDeleteDirectly] = useState(false);

    const {
        control: controlUpdateProfilePicture,
        handleSubmit,
        formState: { errors: errorsUpdateProfilePicture },
        reset: resetUpdateProfilePicture,
        watch: watchUpdateProfilePicture,
        getValues: getValuesUpdateProfilePicture,
        setValue: setValueUpdateProfilePicture,
    } = useForm({
        resolver: yupResolver(schemaUpdateProfilePicture),
    });

    const {
        handleDeleteFile,
        handleUploadFile,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
    } = useMediaHandling();

    const preview = watchUpdateProfilePicture("profilePicture");
    const fileURL = getValuesUpdateProfilePicture("profilePicture");

    const initialPictureRef = useRef<string | null>(null);
    const onUpdateRef = useRef<((data: any) => void) | null>(null);

    const setInitialPicture = (initialPicture: string) => {
        initialPictureRef.current = initialPicture;
    };

    useEffect(() => {
        setInitialPicture(currentPicture);
    }, [currentPicture]);

    useEffect(() => {
        const tempURL = sessionStorage.getItem("temp_uploaded_picture");
        const status = sessionStorage.getItem("uploaded_picture_status");

        if (tempURL && status !== "saved") {
            handleDeleteFile(tempURL, () => {
                sessionStorage.removeItem("temp_uploaded_picture");
                sessionStorage.removeItem("uploaded_picture_status");
            });
        }
    }, []);

    const setOnUpdateProfilePicture = (cb: (data: any) => void) => {
        onUpdateRef.current = cb;
    };

    const handleUploadPicture = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileURL: string | undefined) => {
            if (fileURL) {
                setValueUpdateProfilePicture("profilePicture", fileURL);

                sessionStorage.setItem("temp_uploaded_picture", fileURL);
                sessionStorage.setItem("uploaded_picture_status", "unsaved");
            }
        });
    };

    const handleDeletePicture = (
        onChange: (files: FileList | undefined) => void,
        setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void,
    ) => {
        setIsDeleteDirectly(true);
        handleDeleteFile(fileURL, () => {
            onChange(undefined);

            setHasUnsavedChanges(false);
            setIsDeleteDirectly(false);

            sessionStorage.removeItem("temp_uploaded_picture");
            sessionStorage.removeItem("uploaded_picture_status");
        });
    };

    const handleSubmitUpdateProfilePicture = handleSubmit((data) => {
        sessionStorage.removeItem("temp_uploaded_picture");

        const oldPicture = initialPictureRef.current;
        const newPicture = data.profilePicture;

        const isChanged =
            typeof oldPicture === "string" &&
            typeof newPicture === "string" &&
            oldPicture !== newPicture;

        sessionStorage.setItem("uploaded_picture_status", "saved");

        if (isChanged)
            handleDeleteFile(oldPicture, () => {
                onUpdateRef.current?.(data);
                sessionStorage.removeItem("temp_uploaded_picture");
                sessionStorage.removeItem("uploaded_picture_status");
            });
    });

    return {
        controlUpdateProfilePicture,
        errorsUpdateProfilePicture,
        handleDeletePicture,
        handleSubmitUpdateProfilePicture,
        handleUploadPicture,
        isDeleteDirectly,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        resetUpdateProfilePicture,
        setOnUpdateProfilePicture,
    };
};

export default usePictureTab;
