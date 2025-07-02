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
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";

interface PropTypes {
    currentIcon: string;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
    setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void;
}

const IconTab = (props: PropTypes) => {
    const {
        currentIcon,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate,
        setHasUnsavedChanges,
    } = props;

    const {
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
    } = useIconTab(currentIcon);

    useEffect(() => {
        if (preview) {
            setHasUnsavedChanges(true);
        }
    }, [preview]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateCategoryIcon();
            setHasUnsavedChanges(false);
        }
    }, [isSuccessUpdate]);

    useEffect(() => {
        setOnUpdateCategoryIcon(onUpdate);
    }, [onUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Category Icon</h1>
                <p className="w-full text-small text-default-400">
                    Manage icon of this category
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateCategoryIcon}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">
                            Current Icon
                        </p>
                        <Skeleton
                            isLoaded={!!currentIcon}
                            className="aspect-square rounded-lg"
                        >
                            <div className="relative h-full min-h-[80px] w-full">
                                {currentIcon && (
                                    <Image
                                        alt="Icon for selected category"
                                        className="!relative"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        src={currentIcon}
                                        priority
                                    />
                                )}
                            </div>
                        </Skeleton>
                    </div>
                    <Controller
                        name="icon"
                        control={controlUpdateCategoryIcon}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() =>
                                    handleDeleteIcon(
                                        onChange,
                                        setHasUnsavedChanges,
                                    )
                                }
                                onUpload={(files) =>
                                    handleUploadIcon(files, onChange)
                                }
                                isDropable
                                isUploading={isPendingMutateUploadFile}
                                isDeleting={isDeleteDirectly}
                                isInvalid={
                                    errorsUpdateCategoryIcon.icon !== undefined
                                }
                                errorMessage={
                                    errorsUpdateCategoryIcon.icon?.message
                                }
                                preview={
                                    typeof preview === "string" ? preview : ""
                                }
                                label={
                                    <p className="text-sm font-medium text-default-700">
                                        Upload Icon
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

export default IconTab;
