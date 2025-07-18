import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Skeleton,
    Spinner,
} from "@heroui/react";
import Image from "next/image";
import InputFile from "@/components/ui/InputFile";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";

interface PropTypes {
    currentImage: string;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
    setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void;
}

const ImageTab = (props: PropTypes) => {
    const {
        currentImage,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate,
        setHasUnsavedChanges,
    } = props;

    const {
        controlUpdateBannerImage,
        errorsUpdateBannerImage,
        handleDeleteImage,
        handleSubmitUpdateBannerImage,
        handleUploadImage,
        isDeleteDirectly,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        resetUpdateBannerImage,
        setOnUpdateBannerImage,
    } = useImageTab(currentImage);

    useEffect(() => {
        if (preview) {
            setHasUnsavedChanges(true);
        }
    }, [preview]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateBannerImage();
            setHasUnsavedChanges(false);
        }
    }, [isSuccessUpdate]);

    useEffect(() => {
        setOnUpdateBannerImage(onUpdate);
    }, [onUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Banner Image</h1>
                <p className="w-full text-small text-default-400">
                    Manage image of this banner
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateBannerImage}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">
                            Current Image
                        </p>
                        <Skeleton
                            isLoaded={!!currentImage}
                            className="rounded-lg"
                        >
                            <div className="relative h-full min-h-[80px] w-full">
                                {currentImage && (
                                    <Image
                                        alt="Image for selected category"
                                        className="!relative rounded-lg"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        src={currentImage}
                                        priority
                                    />
                                )}
                            </div>
                        </Skeleton>
                    </div>
                    <Controller
                        name="image"
                        control={controlUpdateBannerImage}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() =>
                                    handleDeleteImage(
                                        onChange,
                                        setHasUnsavedChanges,
                                    )
                                }
                                onUpload={(files) =>
                                    handleUploadImage(files, onChange)
                                }
                                isDropable
                                isUploading={isPendingMutateUploadFile}
                                isDeleting={isDeleteDirectly}
                                isInvalid={
                                    errorsUpdateBannerImage.image !== undefined
                                }
                                errorMessage={
                                    errorsUpdateBannerImage.image?.message
                                }
                                preview={
                                    typeof preview === "string" ? preview : ""
                                }
                                label={
                                    <p className="text-sm font-medium text-default-700">
                                        Upload Image
                                    </p>
                                }
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        disabled={
                            typeof preview !== "string" ||
                            isPendingUpdate ||
                            isPendingMutateUploadFile ||
                            isPendingMutateDeleteFile
                        }
                    >
                        {isPendingUpdate ? (
                            <Spinner color="white" size="sm" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default ImageTab;
