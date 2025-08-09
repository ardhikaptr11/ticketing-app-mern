import { displaySingleDateTime, getEventDuration } from "@/utils/date";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import useTicket from "./useTicket";
import { Button, Skeleton } from "@heroui/react";
import Image from "next/image";

const Ticket = () => {
    const { query } = useRouter();
    const { push } = useRouter();

    const { dataTicket, dataEvent, qrCode, voucherIndex } = useTicket();

    return voucherIndex !== -1 ? (
        <Skeleton
            isLoaded={!!dataTicket && !!dataEvent}
            className="w-[350px] rounded-md"
        >
            <div className="relative h-[635px] w-full">
                <span className="absolute -right-3 top-5 z-0 h-6 w-6 rotate-45 bg-danger-600" />

                <span className="absolute -right-[17px] top-2 z-10 flex h-6 w-[72px] items-center justify-center bg-danger-500 text-center text-xs text-white shadow-md">
                    {dataTicket?.name}
                </span>
                <div className="z-1 relative rounded-full shadow-lg">
                    {/* TOP SECTION */}
                    <div className="relative h-[525px] rounded-t-md bg-[#FFFFFF]">
                        <div className="z-10 px-5 pt-3">
                            <div className="text-center text-lg">
                                <h3 className="font-lato text-foreground-500">
                                    Ticket ID
                                </h3>
                                <p className="font-poppins text-sm font-semibold text-blue-950">
                                    {query.voucher}
                                </p>
                            </div>
                        </div>

                        <img
                            src={`${dataEvent?.banner}`}
                            alt="Event Banner"
                            width={300}
                            height={150}
                            className="w-full py-4"
                        />

                        <div className="px-5 pb-2 text-sm">
                            <h2 className="font-lato italic text-foreground-500">
                                Event
                            </h2>
                            <p className="font-poppins font-semibold text-blue-950">
                                {dataEvent?.name}
                            </p>
                        </div>
                        <div className="flex items-center justify-between px-5 pb-2 text-sm">
                            <div>
                                <h2 className="font-lato italic text-foreground-500">
                                    Date
                                </h2>
                                <p className="font-poppins font-semibold text-blue-950">
                                    {
                                        displaySingleDateTime(
                                            `${dataEvent?.startDate}`,
                                        ).split(", ")[0]
                                    }
                                </p>
                            </div>
                            <div>
                                <h2 className="font-lato italic text-foreground-500">
                                    Time
                                </h2>
                                <p className="font-poppins font-semibold text-blue-950">
                                    {
                                        displaySingleDateTime(
                                            `${dataEvent?.startDate}`,
                                        ).split(", ")[1]
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="px-5 pb-2 text-sm">
                            <h2 className="font-lato italic text-foreground-500">
                                Duration (ETA)
                            </h2>
                            <p className="font-poppins font-semibold text-blue-950">
                                {getEventDuration(
                                    `${dataEvent?.startDate}`,
                                    `${dataEvent?.endDate}`,
                                )}
                            </p>
                        </div>
                        <div className="px-5 pb-2 text-sm">
                            <h2 className="font-lato italic text-foreground-500">
                                Place
                            </h2>
                            <p className="font-poppins font-semibold text-blue-950">
                                {dataEvent?.location?.address}
                            </p>
                        </div>
                    </div>

                    {/* RIP SECTION */}
                    <div className="relative z-0 h-[35px] overflow-hidden bg-[#FFFFFF]">
                        <div
                            className="absolute inset-0 bg-[length:6px_2px] bg-center bg-repeat-x"
                            style={{
                                backgroundImage:
                                    "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==')",
                            }}
                        />
                        <div className="absolute -left-[15px] top-1/2 z-10 h-7 w-7 -translate-y-1/2 rounded-r-full bg-[#f0f0f0] shadow-inner" />

                        <div className="absolute -right-[15px] top-1/2 z-10 h-7 w-7 -translate-y-1/2 rounded-l-full bg-[#f0f0f0] shadow-inner" />
                    </div>

                    {/* BOTTOM SECTION */}
                    <div className="flex h-[75px] items-center justify-center gap-2 rounded-b-md bg-[#FFFFFF] px-5 py-3 font-lato font-bold text-blue-950">
                        <h2>SCAN</h2>
                        <img
                            className="h-full bg-repeat-y"
                            src={`${qrCode}`}
                            alt="QR Code"
                        />
                        <h2>ME!</h2>
                    </div>
                </div>
            </div>
        </Skeleton>
    ) : (
        <div className="flex flex-col items-center">
            <Image
                src="/images/illustrations/not-found.png"
                alt="Ticket not found"
                width={800}
                height={400}
                className="w-full"
            />
            <h1 className="text-center text-lg text-danger-500 lg:text-2xl">
                Oops, tickets you are looking for do not exist
            </h1>
            <Button
                className="mt-4 w-fit"
                variant="bordered"
                color="danger"
                onPress={() => push(`/member/transactions/${query.id}`)}
            >
                View Transactions
            </Button>
        </div>
    );
};

export default Ticket;
