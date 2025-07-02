import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from "@heroui/react";
import useDeleteEventModal from "./useDeleteEventModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchEvents: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
    selectedIcon: string;
    setSelectedIcon: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        refetchEvents,
        selectedId,
        setSelectedId,
        selectedIcon,
        setSelectedIcon,
    } = props;

    const {
        isSuccessMutateDeleteEvent,
        isPendingMutateDeleteEvent,
        mutateDeleteEvent,
    } = useDeleteEventModal();

    useEffect(() => {
        if (isSuccessMutateDeleteEvent) {
            onClose();
            refetchEvents();
        }
    }, [isSuccessMutateDeleteEvent]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Event</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this event?
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
                        disabled={isPendingMutateDeleteEvent}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="danger"
                        disabled={isPendingMutateDeleteEvent}
                        onPress={() =>
                            mutateDeleteEvent({
                                id: selectedId,
                                icon: selectedIcon,
                            })
                        }
                    >
                        {isPendingMutateDeleteEvent ? (
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
