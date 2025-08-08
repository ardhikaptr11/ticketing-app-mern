import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    NumberInput,
    Skeleton,
    Spinner,
    Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useUpdateTicketModal from "./useUpdateTicketModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchTicket: () => void;
    ticketId: string;
}

const UpdateTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchTicket, ticketId } = props;

    const {
        control,
        dataTicket,
        errors,
        handleSubmitForm,
        handleUpdateTicket,
        handleOnClose,
        isPendingMutateUpdateTicket,
        isSuccessMutateUpdateTicket,
        setValueUpdateTicketModal,
    } = useUpdateTicketModal(ticketId);

    useEffect(() => {
        if (isSuccessMutateUpdateTicket) {
            onClose();
            refetchTicket();
        }
    }, [isSuccessMutateUpdateTicket]);

    useEffect(() => {
        if (dataTicket) {
            setValueUpdateTicketModal("name", `${dataTicket?.name}`);
            setValueUpdateTicketModal(
                "description",
                `${dataTicket?.description}`,
            );
            setValueUpdateTicketModal("price", dataTicket?.price);
            setValueUpdateTicketModal("quantity", dataTicket?.quantity);
        }
    }, [dataTicket]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
            onClose={() => handleOnClose(onClose)}
        >
            <form onSubmit={handleSubmitForm(handleUpdateTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader>Update Ticket</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <Skeleton isLoaded={!!dataTicket?.name}>
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
                                            isInvalid={
                                                errors.name !== undefined
                                            }
                                            errorMessage={errors.name?.message}
                                            autoFocus
                                        />
                                    )}
                                />
                            </Skeleton>

                            <Skeleton isLoaded={!!dataTicket?.description}>
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
                            </Skeleton>

                            <Skeleton isLoaded={!!dataTicket?.price}>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({
                                        field: { onChange, ...field },
                                    }) => (
                                        <NumberInput
                                            {...field}
                                            onValueChange={(value) =>
                                                onChange(value)
                                            }
                                            className="mb-2"
                                            label="Price"
                                            placeholder="0"
                                            variant="bordered"
                                            isInvalid={
                                                errors.price !== undefined
                                            }
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
                            </Skeleton>

                            <Skeleton isLoaded={dataTicket?.quantity !== undefined}>
                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({
                                        field: { onChange, ...field },
                                    }) => (
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
                                            errorMessage={
                                                errors.quantity?.message
                                            }
                                        />
                                    )}
                                />
                            </Skeleton>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="flat"
                            color="danger"
                            onPress={() => handleOnClose(onClose)}
                            disabled={isPendingMutateUpdateTicket}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="danger"
                            disabled={isPendingMutateUpdateTicket}
                            className="disabled:bg-default-500"
                        >
                            {isPendingMutateUpdateTicket ? (
                                <Spinner color="white" size="sm" />
                            ) : (
                                "Update Ticket"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default UpdateTicketModal;
