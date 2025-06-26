import { Button, cn, Spinner } from "@heroui/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";

interface PropTypes {
    errorMessage?: string;
    className?: string;
    isDropable?: boolean;
    isInvalid?: boolean;
    name: string;
    onUpload?: (file: FileList) => void;
    onDelete?: () => void;
    isUploading?: boolean;
    isDeleting?: boolean;
    preview?: string;
}

const InputFile = (props: PropTypes) => {
    const {
        errorMessage,
        className,
        isDropable = false,
        isInvalid,
        isDeleting,
        isUploading,
        name,
        onUpload,
        onDelete,
        preview,
    } = props;
    
    const drop = useRef<HTMLLabelElement>(null);
    const dropzoneId = useId();

    const handleDragOver = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer?.files;
        if (files && onUpload) {
            onUpload(files);
        }
    };

    useEffect(() => {
        const dropCurrent = drop.current;

        if (dropCurrent) {
            dropCurrent.addEventListener("dragover", handleDragOver);
            dropCurrent.addEventListener("drop", handleDrop);

            return () => {
                dropCurrent.removeEventListener("dragover", handleDragOver);
                dropCurrent.removeEventListener("drop", handleDrop);
            };
        }
    }, []);

    const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && onUpload) {
            onUpload(files);
        }
    };

    return (
        <div>
            <label
                ref={drop}
                htmlFor={`dropzone-file-${dropzoneId}`}
                className={cn(
                    "mt-2 flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
                    className,
                    { "border-danger-500": isInvalid },
                )}
            >
                {preview && (
                    <div className="relative flex flex-col items-center justify-center p-5">
                        <div className="mb-2 w-1/2">
                            <Image
                                fill
                                src={preview}
                                alt="image"
                                className="!relative"
                            />
                        </div>
                        <Button
                            isIconOnly
                            onPress={onDelete}
                            disabled={isDeleting}
                            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-danger-100"
                        >
                            {isDeleting ? (
                                <Spinner size="sm" color="danger" />
                            ) : (
                                <IoTrashOutline className="h-5 w-5 text-danger-500" />
                            )}
                        </Button>
                    </div>
                )}
                {!preview && !isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
                        <p className="tex-sm text-center font-semibold text-gray-500">
                            {isDropable
                                ? "Drag and drop or click here to upload file"
                                : "Click to upload file here"}
                        </p>
                    </div>
                )}
                {isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <Spinner color="danger" />
                    </div>
                )}
                <input
                    name={name}
                    type="file"
                    className="hidden"
                    id={`dropzone-file-${dropzoneId}`}
                    accept="image/*"
                    onChange={handleOnUpload}
                    disabled={preview !== ""}
                    onClick={(e) => {
                        e.currentTarget.value = "";
                        e.target.dispatchEvent(
                            new Event("change", { bubbles: true }),
                        );
                    }}
                />
            </label>
            {isInvalid && (
                <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
            )}
        </div>
    );
};

export default InputFile;
