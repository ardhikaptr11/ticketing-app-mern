import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { IoTrashOutline, IoInformationCircleOutline } from "react-icons/io5";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import { useEvent } from "./useEvent";
import { SlOptionsVertical } from "react-icons/sl";

const Event = () => {
    const { push, query } = useRouter();
    const {
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents,
        refetchEvents,
        selectedId,
        setSelectedId,
    } = useEvent();

    const addEventModal = useDisclosure();
    const deleteEventModal = useDisclosure();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Asia/Jakarta",
        });
        const formattedDate = formatter.format(date);
        return `${formattedDate.replace(".", ":")} WIB`;
    };

    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event];

            if (columnKey === "startDate" || columnKey === "endDate")
                return formatDate(cellValue as string);

            switch (columnKey) {
                case "banner":
                    return (
                        <Image
                            src={cellValue as string}
                            alt="Event banner"
                            width={200}
                            height={100}
                            className="aspect-video w-36 rounded-lg object-cover"
                        />
                    );
                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <SlOptionsVertical className="text-defualt-700" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="detail-category-button"
                                    onPress={() =>
                                        push(`/admin/event/${event._id}`)
                                    }
                                    startContent={
                                        <IoInformationCircleOutline />
                                    }
                                >
                                    Detail
                                </DropdownItem>
                                <DropdownItem
                                    key="delete-event-button"
                                    className="text-red-500"
                                    startContent={<IoTrashOutline />}
                                    onPress={() => {
                                        setSelectedId(`${event._id}`);
                                        // deleteEventModal.onOpen();
                                    }}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    );
                default:
                    return cellValue as ReactNode;
            }
        },
        [push],
    );

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContentLabel="Create Event"
                    columns={COLUMN_LIST_EVENT}
                    data={dataEvents?.data || []}
                    emptyContent="Event is empty"
                    isLoading={isLoadingEvents || isRefetchingEvents}
                    onClickButtonTopContent={addEventModal.onOpen}
                    renderCell={renderCell}
                    totalPages={dataEvents?.pagination.totalPages}
                />
            )}
            {/* <AddEventModal
                refetchEvents={refetchEvents}
                {...addEventModal}
            />
            <DeleteEventModal
                refetchEvents={refetchEvents}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                {...deleteEventModal}
            /> */}
        </section>
    );
};

export default Event;
