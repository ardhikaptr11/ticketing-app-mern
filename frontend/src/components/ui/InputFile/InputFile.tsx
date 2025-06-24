import { cn } from "@heroui/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
    name: string;
    isDropable?: boolean;
    className?: string;
}

const InputFile = (props: PropTypes) => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const { className, isDropable = false, name } = props;
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
        setUploadedImage(e.dataTransfer?.files?.[0] || null);
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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files.length > 0) {
            setUploadedImage(files[0]);
        }
    };

    return (
        <label
            ref={drop}
            htmlFor={`dropzone-file-${dropzoneId}`}
            className={cn(
                "mt-2 flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
                className,
            )}
        >
            {uploadedImage ? (
                <div className="flex flex-col items-center justify-center p-5">
                    <div className="mb-2 w-1/2">
                        <Image
                            fill
                            src={URL.createObjectURL(uploadedImage)}
                            alt="image"
                            className="!relative"
                        />
                        <p className="tex-sm text-center font-semibold text-gray-500">
                            {uploadedImage.name}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-5">
                    <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
                    <p className="tex-sm text-center font-semibold text-gray-500">
                        {isDropable
                            ? "Drag and drop or click here to upload file"
                            : "Click to upload file here"}
                    </p>
                </div>
            )}
            <input
                name={name}
                type="file"
                className="hidden"
                id={`dropzone-file-${dropzoneId}`}
                accept="image/*"
                onChange={handleOnChange}
            />
        </label>
    );
};

export default InputFile;
