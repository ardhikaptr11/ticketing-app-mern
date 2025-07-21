import { ModalContext } from "@/contexts/ModalContext";
import { signOut } from "next-auth/react";
import { useContext } from "react";

const useSessionExpiredModal = () => {
    const { setModal } = useContext(ModalContext);

    const handleOnClose = (onClose: () => void) => {
        signOut();
        onClose();
    };

    return { handleOnClose, setModal };
};

export default useSessionExpiredModal;
