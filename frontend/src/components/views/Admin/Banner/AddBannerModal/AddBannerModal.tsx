import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Spinner,
} from "@heroui/react";
import React, { RefObject, useEffect, useRef } from "react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useDraggable } from "@/hooks/useDraggable";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchBanners: () => void;
}

const AddBannerModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchBanners } = props;

        const targetRef = useRef<HTMLElement>(null) as RefObject<HTMLElement>;
        const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

    const {
        control,
        errors,
        handleSubmitForm,
        handleAddBanner,
        handleDeleteImage,
        handleOnClose,
        handleUploadImage,
        isPendingMutateAddBanner,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        isSuccessMutateAddBanner,
        preview,
    } = useAddBannerModal();

    useEffect(() => {
        if (isSuccessMutateAddBanner) {
            onClose();
            refetchBanners();
        }
    }, [isSuccessMutateAddBanner]);

    const disabledSubmit =
        isPendingMutateAddBanner ||
        isPendingMutateUploadFile ||
        isPendingMutateDeleteFile;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
            onClose={() => handleOnClose(onClose)}
            ref={targetRef}
        >
            <form onSubmit={handleSubmitForm(handleAddBanner)}>
                <ModalContent className="m-4">
                    <ModalHeader {...moveProps}>Add New Banner</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="mb-2"
                                        label="Name"
                                        type="text"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.title !== undefined}
                                        errorMessage={errors.title?.message}
                                        autoFocus
                                    />
                                )}
                            />
                            <Controller
                                name="isShow"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Showing Status"
                                        variant="bordered"
                                        isInvalid={
                                            errors.isShow !== undefined
                                        }
                                        errorMessage={
                                            errors.isShow?.message
                                        }
                                        disallowEmptySelection
                                        selectionMode="single"
                                    >
                                        <SelectItem
                                            key="true"
                                            textValue="Showing"
                                        >
                                            Showing
                                        </SelectItem>
                                        <SelectItem
                                            key="false"
                                            textValue="Not Showing"
                                        >
                                            Not Showing
                                        </SelectItem>
                                    </Select>
                                )}
                            />
                            <p className="text-sm font-bold">Image</p>
                            <Controller
                                name="image"
                                control={control}
                                render={({
                                    field: { onChange, value, ...field },
                                }) => (
                                    <InputFile
                                        {...field}
                                        onDelete={() =>
                                            handleDeleteImage(onChange)
                                        }
                                        onUpload={(files) =>
                                            handleUploadImage(files, onChange)
                                        }
                                        isUploading={isPendingMutateUploadFile}
                                        isDeleting={isPendingMutateDeleteFile}
                                        isInvalid={errors.image !== undefined}
                                        errorMessage={errors.image?.message}
                                        preview={
                                            typeof preview === "string"
                                                ? preview
                                                : ""
                                        }
                                        isDropable
                                    />
                                )}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="flat"
                            color="danger"
                            onPress={() => handleOnClose(onClose)}
                            disabled={disabledSubmit}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="danger"
                            disabled={disabledSubmit}
                            className="disabled:bg-default-500"
                        >
                            {isPendingMutateAddBanner ? (
                                <Spinner color="white" size="sm" />
                            ) : (
                                "Add Banner"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddBannerModal;
