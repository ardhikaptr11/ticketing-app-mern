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
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
    currentPicture: string;
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
    setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void;
}

const PictureTab = (props: PropTypes) => {
    const {
        currentPicture,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate,
        setHasUnsavedChanges,
    } = props;

    const {
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
    } = usePictureTab(currentPicture);

    useEffect(() => {
        if (preview) {
            setHasUnsavedChanges(true);
        }
    }, [preview]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateProfilePicture();
            setHasUnsavedChanges(false);
        }
    }, [isSuccessUpdate]);

    useEffect(() => {
        setOnUpdateProfilePicture(onUpdate);
    }, [onUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Profile Picture</h1>
                <p className="w-full text-small text-default-400">
                    Manage profile picture of your account.
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateProfilePicture}
                >
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-medium text-default-700">
                            Current Picture
                        </p>
                        <Skeleton
                            isLoaded={!!currentPicture}
                            className="relative mx-auto h-full w-full max-w-xs rounded-full"
                        >
                            {currentPicture && (
                                <Image
                                    alt="User profile"
                                    className="!relative rounded-full"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    src={currentPicture}
                                    priority
                                />
                            )}
                        </Skeleton>
                    </div>
                    <Controller
                        name="profilePicture"
                        control={controlUpdateProfilePicture}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() =>
                                    handleDeletePicture(
                                        onChange,
                                        setHasUnsavedChanges,
                                    )
                                }
                                onUpload={(files) =>
                                    handleUploadPicture(files, onChange)
                                }
                                isDropable
                                isUploading={isPendingMutateUploadFile}
                                isDeleting={isDeleteDirectly}
                                isInvalid={
                                    errorsUpdateProfilePicture.profilePicture !==
                                    undefined
                                }
                                errorMessage={
                                    errorsUpdateProfilePicture.profilePicture
                                        ?.message
                                }
                                preview={
                                    typeof preview === "string" ? preview : ""
                                }
                                label={
                                    <p className="text-sm font-medium text-default-700">
                                        Upload Picture
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

export default PictureTab;
