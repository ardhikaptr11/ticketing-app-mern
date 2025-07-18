import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from "@heroui/react";
import useDeleteBannerModal from "./useDeleteBannerModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchBanners: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
    selectedImage: string;
    setSelectedImage: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        refetchBanners,
        selectedId,
        setSelectedId,
        selectedImage,
        setSelectedImage,
    } = props;

    const {
        isSuccessMutateDeleteBanner,
        isPendingMutateDeleteBanner,
        mutateDeleteBanner,
    } = useDeleteBannerModal();

    useEffect(() => {
        if (isSuccessMutateDeleteBanner) {
            onClose();
            refetchBanners();
        }
    }, [isSuccessMutateDeleteBanner]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Banner</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this banner?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="flat"
                        color="danger"
                        onPress={() => {
                            onClose();
                            setSelectedId("");
                            setSelectedImage("");
                        }}
                        disabled={isPendingMutateDeleteBanner}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="danger"
                        className="disabled:bg-default-500"
                        disabled={isPendingMutateDeleteBanner}
                        onPress={() =>
                            mutateDeleteBanner({
                                id: selectedId,
                                image: selectedImage,
                            })
                        }
                    >
                        {isPendingMutateDeleteBanner ? (
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

export default DeleteBannerModal;
