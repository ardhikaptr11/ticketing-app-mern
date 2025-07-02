import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import { useEvent } from "./useEvent";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

const Event = () => {
    const { push, query } = useRouter();
    const {
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents,
        refetchEvents,
        selectedIcon,
        setSelectedIcon,
        selectedId,
        setSelectedId,
    } = useEvent();

    const addEventModal = useDisclosure();
    const deleteEventModal = useDisclosure();

    const displayDate = (dateString: string) => {
        const date = new Date(dateString);

        const formatter = new Intl.DateTimeFormat("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Asia/Jakarta",
        });
        const displayedDate = formatter.format(date);
        return `${displayedDate.replace(" pukul", ",")} WIB`;
    };

    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event];

            if (columnKey === "startDate" || columnKey === "endDate")
                return displayDate(cellValue as string);

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
                case "isPublished":
                    return (
                        <Chip
                            color={cellValue === true ? "success" : "warning"}
                            size="sm"
                            variant="flat"
                        >
                            {cellValue === true ? "Published" : "Drafted"}
                        </Chip>
                    );
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() =>
                                push(`/admin/event/${event._id}`)
                            }
                            onPressButtonDelete={() => {
                                setSelectedId(`${event._id}`);
                                deleteEventModal.onOpen();
                            }}
                        />
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
            <AddEventModal refetchEvents={refetchEvents} {...addEventModal} />
            <DeleteEventModal
                refetchEvents={refetchEvents}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                {...deleteEventModal}
            />
        </section>
    );
};

export default Event;
