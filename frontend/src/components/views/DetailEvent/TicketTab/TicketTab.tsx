import { ITicket } from "@/types/Ticket";
import cn from "@/utils/cn";
import { convertToIDR } from "@/utils/currency";
import { Accordion, AccordionItem, Button, Chip } from "@heroui/react";
import { Fragment } from "react";
import { IoCartOutline } from "react-icons/io5";

interface PropTypes {
    dataTicket: ITicket[];
    handleAddToCart: (ticket: string) => void;
    isAddedToCart: Record<string, boolean>;
}

const TicketTab = (props: PropTypes) => {
    const { dataTicket, handleAddToCart, isAddedToCart } = props;

    return (
        <Fragment>
            <h1 className="mb-2 text-xl font-semibold text-gray-700">Ticket</h1>
            {dataTicket?.length === 0 ? (
                <div className="flex min-h-[100px] items-center justify-center">
                    <p className="text-md text-center font-semibold text-default-500 opacity-50">
                        Oops, it seems that no tickets have been sold by the
                        event organizer.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {dataTicket?.map((ticket: ITicket) => (
                        <Accordion
                            variant="splitted"
                            key={`accordion-ticket-${ticket._id}`}
                        >
                            <AccordionItem
                                key={`ticket-item-${ticket._id}`}
                                aria-label={`${ticket.name}`}
                                title={
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-700">
                                                {ticket.name}
                                            </h3>
                                            <Chip
                                                color={
                                                    ticket.quantity !== 0
                                                        ? "success"
                                                        : "danger"
                                                }
                                                size="sm"
                                                variant="bordered"
                                            >
                                                {ticket.quantity !== 0
                                                    ? "Available"
                                                    : "Sold"}
                                            </Chip>
                                        </div>
                                        {ticket.quantity !== 0 && (
                                            <p
                                                className={cn("text-sm", {
                                                    "text-success-300":
                                                        (ticket.quantity as number) >
                                                        20,
                                                    "text-warning-300":
                                                        (ticket.quantity as number) <=
                                                        20,
                                                    "text-danger-300":
                                                        (ticket.quantity as number) <=
                                                        5,
                                                })}
                                            >
                                                Qty: {ticket.quantity}
                                            </p>
                                        )}
                                    </div>
                                }
                            >
                                <div className="flex flex-col gap-2">
                                    <p>{ticket?.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-700">
                                            {convertToIDR(
                                                ticket?.price as number,
                                            )}
                                        </p>
                                        {ticket?.quantity !== 0 && (
                                            <Button
                                                variant="bordered"
                                                isDisabled={
                                                    isAddedToCart[
                                                        `${ticket._id}`
                                                    ]
                                                }
                                                color="warning"
                                                size="sm"
                                                className="flex items-center justify-center gap-2"
                                                onPress={() => {
                                                    handleAddToCart(
                                                        `${ticket._id}`,
                                                    );
                                                }}
                                            >
                                                <IoCartOutline className="text-lg" />
                                                <p className="font-bold">
                                                    Add{" "}
                                                    <span className="hidden lg:inline-block">
                                                        To Cart
                                                    </span>
                                                </p>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default TicketTab;
