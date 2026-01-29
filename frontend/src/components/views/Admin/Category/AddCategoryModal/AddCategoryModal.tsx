import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    Textarea,
} from "@heroui/react";
import React, { RefObject, useEffect, useRef } from "react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useDraggable } from "@/hooks/useDraggable";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchCategories: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchCategories } = props;
    const targetRef = useRef<HTMLElement>(null) as RefObject<HTMLElement>;
    const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

    const {
        control,
        errors,
        handleAddCategory,
        handleDeleteIcon,
        handleOnClose,
        handleSubmitForm,
        handleUploadIcon,
        isPendingMutateDeleteFile,
        isPendingMutateAddCategory,
        isPendingMutateUploadFile,
        isSuccessMutateAddCategory,
        preview,
    } = useAddCategoryModal();

    useEffect(() => {
        if (isSuccessMutateAddCategory) {
            onClose();
            refetchCategories();
        }
    }, [isSuccessMutateAddCategory]);

    const disabledSubmit =
        isPendingMutateAddCategory ||
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
            <form onSubmit={handleSubmitForm(handleAddCategory)}>
                <ModalContent className="m-4">
                    <ModalHeader {...moveProps}>Add New Category</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="mb-2"
                                        label="Name"
                                        type="text"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.name !== undefined}
                                        errorMessage={errors.name?.message}
                                        autoFocus
                                    />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className="mb-2"
                                        label="Description"
                                        variant="bordered"
                                        isInvalid={
                                            errors.description !== undefined
                                        }
                                        errorMessage={
                                            errors.description?.message
                                        }
                                    />
                                )}
                            />
                            <p className="text-sm font-bold">Icon</p>
                            <Controller
                                name="icon"
                                control={control}
                                render={({
                                    field: { onChange, value, ...field },
                                }) => (
                                    <InputFile
                                        {...field}
                                        onDelete={() =>
                                            handleDeleteIcon(onChange)
                                        }
                                        onUpload={(files) =>
                                            handleUploadIcon(files, onChange)
                                        }
                                        isUploading={isPendingMutateUploadFile}
                                        isDeleting={isPendingMutateDeleteFile}
                                        isInvalid={errors.icon !== undefined}
                                        errorMessage={errors.icon?.message}
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
                            {isPendingMutateAddCategory ? (
                                <Spinner color="white" size="sm" />
                            ) : (
                                "Add Category"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddCategoryModal;
