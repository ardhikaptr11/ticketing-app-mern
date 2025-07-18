import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from "@heroui/react";
import useDeleteTicketModal from "./useDeleteTicketModal.tsx";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchTicket: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        refetchTicket,
        selectedId,
        setSelectedId,
    } = props;

    const {
        isSuccessMutateDeleteTicket,
        isPendingMutateDeleteTicket,
        mutateDeleteTicket,
    } = useDeleteTicketModal();

    useEffect(() => {
        if (isSuccessMutateDeleteTicket) {
            onClose();
            refetchTicket();
        }
    }, [isSuccessMutateDeleteTicket]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Ticket</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this ticket?
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
                        disabled={isPendingMutateDeleteTicket}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="danger"
                        className="disabled:bg-default-500"
                        disabled={isPendingMutateDeleteTicket}
                        onPress={() => mutateDeleteTicket(selectedId)}
                    >
                        {isPendingMutateDeleteTicket ? (
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

export default DeleteEventModal;
