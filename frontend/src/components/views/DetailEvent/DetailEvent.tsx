import React, { Fragment } from "react";
import CartSidebar from "./CartSidebar";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Skeleton,
    Tab,
    Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { displayEventDateTime } from "@/utils/date";
import Image from "next/image";
import DescriptionTab from "./DescriptionTab";
import TicketTab from "./TicketTab";
import Script from "next/script";
import environment from "@/config/environment";
import LoginModal from "./LoginModal";

const DetailEvent = () => {
    const {
        cart,
        dataEvent,
        dataTicket,
        dataTicketInCart,
        handleAddToCart,
        handleChangeQuantity,
        handleCheckout,
        isAddedToCart,
        isPendingCreateOrder,
        loginModal,
        totalPrice,
    } = useDetailEvent();

    return (
        <div className="px-8 md:px-0">
            <Script
                src={environment.MIDTRANS_SNAP_URL}
                data-client-key={environment.MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
            {!!dataEvent?.name ? (
                <Breadcrumbs>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem href="/events">Events</BreadcrumbItem>
                    <BreadcrumbItem>{dataEvent?.name}</BreadcrumbItem>
                </Breadcrumbs>
            ) : (
                <Skeleton className="h-6 w-1/5 rounded-lg" />
            )}

            <section className="mt-4 flex flex-col gap-10 lg:flex-row">
                <div className="flex w-full flex-col gap-2 lg:w-4/6">
                    <div className="flex flex-col gap-2">
                        {dataEvent ? (
                            <Fragment>
                                <h1 className="text-2xl font-semibold text-danger">
                                    {dataEvent?.name}
                                </h1>
                                <div className="flex items-center gap-2 text-foreground-500">
                                    <FaClock width={16} />
                                    <p>
                                        {displayEventDateTime(
                                            `${dataEvent?.startDate}`,
                                            `${dataEvent?.endDate}`,
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-foreground-500">
                                    <FaLocationDot width={16} />
                                    <p>
                                        {dataEvent?.isOnline
                                            ? "Online"
                                            : dataEvent?.location?.address}
                                    </p>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Skeleton className="h-8 w-1/5 rounded-lg" />
                                <Skeleton className="h-6 w-2/5 rounded-lg" />
                                <Skeleton className="h-6 w-3/5 rounded-lg" />
                            </Fragment>
                        )}
                    </div>
                    <Skeleton
                        className="aspect-video w-full"
                        isLoaded={!!dataEvent?.banner}
                    >
                        {dataEvent?.banner && (
                            <Image
                                alt="Event banner"
                                className="aspect-video w-full rounded-lg object-cover"
                                width={1920}
                                height={1080}
                                src={dataEvent?.banner}
                                priority
                            />
                        )}
                    </Skeleton>
                    <Tabs aria-label="Options" fullWidth>
                        <Tab key="description" title="Description">
                            <DescriptionTab
                                description={dataEvent?.description}
                            />
                        </Tab>
                        <Tab key="ticket" title="Ticket">
                            <TicketTab
                                dataTicket={dataTicket}
                                handleAddToCart={handleAddToCart}
                                isAddedToCart={isAddedToCart}
                            />
                        </Tab>
                    </Tabs>
                </div>
                <div className="w-full lg:w-2/6">
                    <CartSidebar
                        cart={cart}
                        dataTicketInCart={dataTicketInCart}
                        handleChangeQuantity={handleChangeQuantity}
                        totalPrice={totalPrice}
                        handleCheckout={handleCheckout}
                        isPending={isPendingCreateOrder}
                    />
                </div>
            </section>
            <LoginModal {...loginModal} />
        </div>
    );
};

export default DetailEvent;
