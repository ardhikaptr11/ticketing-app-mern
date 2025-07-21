import SessionExpiredModal from "@/components/ui/SessionExpiredModal";
import { createContext, ReactNode, useState } from "react";

interface IModal {
    title: string;
    message: string;
}

interface IModalState {
    modal: IModal;
    setModal: (modal: IModal) => void;
}

const defaultModal = {
    title: "",
    message: "",
};

const ModalContext = createContext<IModalState>({
    modal: defaultModal,
    setModal: () => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<IModal>(defaultModal);

    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export { defaultModal, ModalProvider, ModalContext }
export type { IModal, IModalState }
