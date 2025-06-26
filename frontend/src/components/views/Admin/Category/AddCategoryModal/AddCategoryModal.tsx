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
import React, { useEffect } from "react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchCategory } = props;

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
            refetchCategory();
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
        >
            <form onSubmit={handleSubmitForm(handleAddCategory)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
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
