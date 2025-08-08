import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    useDisclosure,
} from "@heroui/react";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_TICKET } from "./TicketTab.constants";
import { useTicketTab } from "./useTicketTab";
import DropdownAction from "@/components/commons/DropdownAction";
import AddTicketModal from "./AddTicketModal";
import UpdateTicketModal from "./UpdateTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { convertToIDR } from "@/utils/currency";
import { LuPencilLine } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";

const TicketTab = () => {
    const {
        dataTickets,
        refetchTicket,
        isPendingTicket,
        isRefetchingTicket,
        selectedId,
        setSelectedId,
    } = useTicketTab();

    const addTicketModal = useDisclosure();
    const updateTicketModal = useDisclosure();
    const deleteTicketModal = useDisclosure();

    const renderCell = useCallback(
        (ticket: Record<string, unknown>, columnKey: Key) => {
            const cellValue = ticket[columnKey as keyof typeof ticket];

            const listOfActions = [
                {
                    name: "edit",
                    startContent: <LuPencilLine className="text-medium" />,
                    action: () => {
                        setSelectedId(`${ticket._id}`);
                        updateTicketModal.onOpen();
                    },
                },
                {
                    name: "delete",
                    startContent: <IoTrashOutline className="text-medium" />,
                    action: () => {
                        setSelectedId(`${ticket._id}`);
                        deleteTicketModal.onOpen();
                    },
                },
            ];

            switch (columnKey) {
                case "price":
                    return `${convertToIDR(cellValue as number)}`;
                case "actions":
                    return (
                        <DropdownAction listOfActions={listOfActions ?? []} />
                    );
                default:
                    return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <Card className="w-full p-4">
            <CardHeader className="items-center justify-between">
                <div className="flex flex-col items-center">
                    <h1 className="w-full text-xl font-bold">Event Ticket</h1>
                    <p className="w-full text-small text-default-400">
                        Manage ticket of this event
                    </p>
                </div>
                <Button color="danger" onPress={addTicketModal.onOpen}>
                    Create New Ticket
                </Button>
            </CardHeader>
            <CardBody className="pt-0">
                <DataTable
                    columns={COLUMN_LIST_TICKET}
                    data={dataTickets || []}
                    emptyContent="Ticket is empty"
                    isLoading={isPendingTicket || isRefetchingTicket}
                    renderCell={renderCell}
                    showLimit={false}
                    showSearch={false}
                    totalPages={1}
                />
                <AddTicketModal
                    refetchTicket={refetchTicket}
                    {...addTicketModal}
                />
                <UpdateTicketModal
                    refetchTicket={refetchTicket}
                    ticketId={selectedId}
                    {...updateTicketModal}
                />
                <DeleteTicketModal
                    refetchTicket={refetchTicket}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    {...deleteTicketModal}
                />
            </CardBody>
        </Card>
    );
};

export default TicketTab;
