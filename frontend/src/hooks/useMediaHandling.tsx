import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useMediaHandling = () => {
    const { setToaster } = useContext(ToasterContext);
    const uploadIcon = async (
        file: File,
        callback: (fileURL: string) => void,
    ) => {
        const formData = new FormData();
        formData.append("image", file);
        const {
            data: {
                data: { secure_url: icon },
            },
        } = await uploadServices.uploadFile(formData);
        callback(icon);
    };

    const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
        useMutation({
            mutationFn: (variables: {
                file: File;
                callback: (fileURL: string) => void;
            }) => uploadIcon(variables.file, variables.callback),
            onError: (error: AxiosError<{ meta: { message: string } }>) => {
                const message = error.response!.data.meta.message;

                setToaster({
                    type: "error",
                    message,
                });
            },
        });

    const deleteIcon = async (fileURL: string, callback: () => void) => {
        const res = await uploadServices.deleteFile({ fileURL });

        if (res.status === 200) {
            callback();
        }
    };

    const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
        useMutation({
            mutationFn: (variables: {
                fileURL: string;
                callback: () => void;
            }) => deleteIcon(variables.fileURL, variables.callback),
            onError: (error) => {
                setToaster({
                    type: "error",
                    message: error.message,
                });
            },
        });

    return {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile,
    };
};

export default useMediaHandling;
