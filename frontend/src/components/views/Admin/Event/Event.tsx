import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import { useEvent } from "./useEvent";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";
import { displaySingleDateTime } from "@/utils/date";
import {
    ALLOWED_LIMITS,
    LIMIT_DEFAULT,
    PAGE_DEFAULT,
} from "@/constants/list.constants";
import useChangeURL from "@/hooks/useChangeURL";
import { IoTrashOutline } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";

const Event = () => {
    const { isReady, push, query, replace } = useRouter();
    const { setUrl, currentLimit, currentSearch } = useChangeURL();

    const {
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents,
        refetchEvents,
        selectedBanner,
        setSelectedBanner,
        selectedId,
        setSelectedId,
    } = useEvent();

    useEffect(() => {
        if (isReady) {
            if (!ALLOWED_LIMITS.includes(currentLimit as string)) {
                replace({
                    query: {
                        limit: LIMIT_DEFAULT,
                        page: PAGE_DEFAULT,
                        search: currentSearch || "",
                    },
                });
                return;
            }

            setUrl();
        }
    }, [isReady]);

    const addEventModal = useDisclosure();
    const deleteEventModal = useDisclosure();

    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event];

            const listOfActions = [
                {
                    name: "detail",
                    startContent: <RiInformationLine className="text-medium" />,
                    action: () => push(`/admin/event/${event._id}`),
                },
                {
                    name: "delete",
                    startContent: <IoTrashOutline className="text-medium" />,
                    action: () => {
                        setSelectedId(`${event._id}`);
                        setSelectedBanner(`${event.banner}`);
                        deleteEventModal.onOpen();
                    },
                },
            ];

            if (columnKey === "startDate" || columnKey === "endDate")
                return displaySingleDateTime(cellValue as string);

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
                        <DropdownAction listOfActions={listOfActions ?? []} />
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
                selectedBanner={selectedBanner}
                setSelectedBanner={setSelectedBanner}
                {...deleteEventModal}
            />
        </section>
    );
};

export default Event;
