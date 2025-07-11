import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from "@heroui/react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchCategories: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
    selectedIcon: string;
    setSelectedIcon: Dispatch<SetStateAction<string>>;
}

const DeleteCategoryModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        refetchCategories,
        selectedId,
        setSelectedId,
        selectedIcon,
        setSelectedIcon,
    } = props;

    const {
        isSuccessMutateDeleteCategory,
        isPendingMutateDeleteCategory,
        mutateDeleteCategory,
    } = useDeleteCategoryModal();

    useEffect(() => {
        if (isSuccessMutateDeleteCategory) {
            onClose();
            refetchCategories();
        }
    }, [isSuccessMutateDeleteCategory]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Category</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this category?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="flat"
                        color="danger"
                        onPress={() => {
                            onClose();
                            setSelectedId("");
                            setSelectedIcon("");
                        }}
                        disabled={isPendingMutateDeleteCategory}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="danger"
                        className="disabled:bg-default-500"
                        disabled={isPendingMutateDeleteCategory}
                        onPress={() =>
                            mutateDeleteCategory({
                                id: selectedId,
                                icon: selectedIcon,
                            })
                        }
                    >
                        {isPendingMutateDeleteCategory ? (
                            <Spinner color="white" size="sm" />
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteCategoryModal;
