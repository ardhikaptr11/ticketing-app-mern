import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    NumberInput,
    Spinner,
    Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddTicketModal from "./useAddTicketModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchTicket: () => void;
}

const AddTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchTicket } = props;

    const {
        control,
        errors,
        handleSubmitForm,
        handleAddTicket,
        handleOnClose,
        isPendingMutateAddTicket,
        isSuccessMutateAddTicket,
    } = useAddTicketModal();

    useEffect(() => {
        if (isSuccessMutateAddTicket) {
            onClose();
            refetchTicket();
        }
    }, [isSuccessMutateAddTicket]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
            onClose={() => handleOnClose(onClose)}
        >
            <form onSubmit={handleSubmitForm(handleAddTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add New Ticket</ModalHeader>
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
                            <Controller
                                name="price"
                                control={control}
                                render={({ field: { onChange, ...field } }) => (
                                    <NumberInput
                                        {...field}
                                        onValueChange={(value) =>
                                            onChange(value)
                                        }
                                        className="mb-2"
                                        label="Price"
                                        placeholder="0"
                                        variant="bordered"
                                        isInvalid={!!errors.price}
                                        errorMessage={errors.price?.message}
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-small text-default-500">
                                                    Rp
                                                </span>
                                            </div>
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="quantity"
                                control={control}
                                render={({ field: { onChange, ...field } }) => (
                                    <NumberInput
                                        {...field}
                                        onValueChange={(value) =>
                                            onChange(value)
                                        }
                                        className="mb-2"
                                        label="Quantity"
                                        variant="bordered"
                                        isInvalid={
                                            errors.quantity !== undefined
                                        }
                                        errorMessage={errors.quantity?.message}
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
                            disabled={isPendingMutateAddTicket}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="danger"
                            disabled={isPendingMutateAddTicket}
                            className="disabled:bg-default-500"
                        >
                            {isPendingMutateAddTicket ? (
                                <Spinner color="white" size="sm" />
                            ) : (
                                "Add Ticket"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddTicketModal;
