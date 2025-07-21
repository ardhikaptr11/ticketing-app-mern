import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import useSessionExpiredModal from "./useSessionExpiredModal";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    title: string;
    message: string;
}

const SessionExpiredModal = (props: PropTypes) => {
    const { isOpen, title, message } = props;

    const { onClose } = useDisclosure();
    const { handleOnClose } = useSessionExpiredModal();

    return (
        <Modal
            backdrop="blur"
            size="md"
            placement="center"
            scrollBehavior="inside"
            isOpen={isOpen}
            onClose={() => handleOnClose(onClose)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {title}
                        </ModalHeader>
                        <ModalBody>
                            <p>{message}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="solid"
                                onPress={() => handleOnClose(onClose)}
                            >
                                OK
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

const SessionExpiredModalListener = () => {
    const { setModal } = useSessionExpiredModal();

    useEffect(() => {
        const handler = () => {
            setModal({
                title: "Session Expired",
                message: "Your session has expired. Please sign in again.",
            });
        };

        window.addEventListener("sessionExpired", handler);
        return () => {
            window.removeEventListener("sessionExpired", handler);
        };
    }, [setModal]);

    return null;
};

export { SessionExpiredModal, SessionExpiredModalListener };
