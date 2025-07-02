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
import useBannerTab from "./useBannerTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent, IEventForm } from "@/types/Event";

interface PropTypes {
    currentBanner: string;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
    setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void;
}

const CoverTab = (props: PropTypes) => {
    const {
        currentBanner,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate,
        setHasUnsavedChanges,
    } = props;

    const {
        controlUpdateEventBanner,
        errorsUpdateEventBanner,
        handleDeleteBanner,
        handleSubmitUpdateEventBanner,
        handleUploadBanner,
        isDeleteDirectly,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        resetUpdateEventBanner,
        setOnUpdateEventBanner,
    } = useBannerTab(currentBanner);

    useEffect(() => {
        if (preview) {
            setHasUnsavedChanges(true);
        }
    }, [preview]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateEventBanner();
            setHasUnsavedChanges(false);
        }
    }, [isSuccessUpdate]);

    useEffect(() => {
        setOnUpdateEventBanner(onUpdate);
    }, [onUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Banner</h1>
                <p className="w-full text-small text-default-400">
                    Manage banner for this event.
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateEventBanner}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">
                            Current Banner
                        </p>
                        <Skeleton
                            isLoaded={!!currentBanner}
                            className="aspect-video rounded-lg"
                        >
                            <div className="relative h-full min-h-[80px] w-full">
                                {currentBanner && (
                                    <Image
                                        alt="Icon for selected category"
                                        className="!relative rounded-lg"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        src={currentBanner}
                                        priority
                                    />
                                )}
                            </div>
                        </Skeleton>
                    </div>
                    <Controller
                        name="banner"
                        control={controlUpdateEventBanner}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() =>
                                    handleDeleteBanner(
                                        onChange,
                                        setHasUnsavedChanges,
                                    )
                                }
                                onUpload={(files) =>
                                    handleUploadBanner(files, onChange)
                                }
                                isDropable
                                isUploading={isPendingMutateUploadFile}
                                isDeleting={isDeleteDirectly}
                                isInvalid={
                                    errorsUpdateEventBanner.banner !== undefined
                                }
                                errorMessage={
                                    errorsUpdateEventBanner.banner?.message
                                }
                                preview={
                                    typeof preview === "string" ? preview : ""
                                }
                                label={
                                    <p className="text-sm font-medium text-default-700">
                                        Upload Banner
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

export default CoverTab;
