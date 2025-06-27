import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateCategoryIcon = yup.object().shape({
    icon: yup.mixed<FileList | string>().required("Icon is required"),
});

const useIconTab = () => {
    const {
        control: controlUpdateCategoryIcon,
        handleSubmit: handleSubmitUpdateCategoryIcon,
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
                },
            });
        }
    };

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        const fileURL = getValuesUpdateCategoryIcon("icon");

        if (typeof fileURL === "string") {
            mutateDeleteFile({
                fileURL,
                callback: () => onChange(undefined),
            });
        }
    };

    return {
        controlUpdateCategoryIcon,
        errorsUpdateCategoryIcon,
        handleDeleteIcon,
        handleSubmitUpdateCategoryIcon,
        handleUploadIcon,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        resetUpdateCategoryIcon,
    };
};

export default useIconTab;
