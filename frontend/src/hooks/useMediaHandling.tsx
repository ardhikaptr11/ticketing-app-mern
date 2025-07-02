import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";

const useMediaHandling = () => {
    const { push } = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const uploadFile = async (
        file: File,
        callback: (fileURL: string) => void,
    ) => {
        const formData = new FormData();
        formData.append("image", file);
        const {
            data: {
                data: { secure_url: fileURL },
            },
        } = await uploadServices.uploadFile(formData);
        callback(fileURL);
    };

    const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
        useMutation({
            mutationFn: (variables: {
                file: File;
                callback: (fileURL: string) => void;
            }) => uploadFile(variables.file, variables.callback),
            onError: (error: AxiosError<{ meta: { message: string } }>) => {
                const message = error.response!.data.meta.message;

                setToaster({
                    type: "error",
                    message,
                });
            },
        });

    const deleteFile = async (fileURL: string, callback: () => void) => {
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
            }) => deleteFile(variables.fileURL, variables.callback),
            onError: (error) => {
                setToaster({
                    type: "error",
                    message: error.message,
                });
            },
        });

    const handleUploadFile = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
        callback: (fileURL?: string) => void,
    ) => {
        if (files.length !== 0) {
            onChange(files);
            mutateUploadFile({
                file: files[0],
                callback,
            });
        }
    };

    const handleDeleteFile = (
        fileURL: FileList | string | undefined,
        callback: () => void,
    ) => {
        if (typeof fileURL !== "string") {
            return callback();
        }

        mutateDeleteFile({
            fileURL,
            callback,
        });
    };

    return {
        handleDeleteFile,
        handleUploadFile,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
    };
};

export default useMediaHandling;
