import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchTransactions: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTransactionModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        refetchTransactions,
        selectedId,
        setSelectedId,
    } = props;

    const {
        isSuccessMutateDeleteTransaction,
        isPendingMutateDeleteTransaction,
        mutateDeleteTransaction,
    } = useDeleteTransactionModal();

    useEffect(() => {
        if (isSuccessMutateDeleteTransaction) {
            onClose();
            refetchTransactions();
        }
    }, [isSuccessMutateDeleteTransaction]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Transaction</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this transaction
                        history?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="flat"
                        color="danger"
                        onPress={() => {
                            onClose();
                            setSelectedId("");
                        }}
                        disabled={isPendingMutateDeleteTransaction}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="danger"
                        className="disabled:bg-default-500"
                        disabled={isPendingMutateDeleteTransaction}
                        onPress={() => mutateDeleteTransaction(selectedId)}
                    >
                        {isPendingMutateDeleteTransaction ? (
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

export default DeleteTransactionModal;
