import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { defaultCart } from "./DetailEvent.constants";
import { ICart, ITicket } from "@/types/Ticket";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@heroui/react";
import orderServices from "@/services/order.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { AxiosError } from "axios";

const useDetailEvent = () => {
    const {
        query: { slug },
        isReady,
    } = useRouter();

    const { status } = useSession();

    const loginModal = useDisclosure();

    const { setToaster } = useContext(ToasterContext);

    const getEventBySlug = async () => {
        const { data } = await eventServices.getEventBySlug(`${slug}`);

        return data.data;
    };

    const { data: dataEvent } = useQuery({
        queryKey: ["EventBySlug"],
        queryFn: getEventBySlug,
        enabled: isReady,
    });

    const getEventTicket = async () => {
        const { data } = await ticketServices.getTicketsByEventId(
            `${dataEvent?._id}`,
        );

        return data.data;
    };

    const { data: dataTicket } = useQuery({
        queryKey: ["EventTickets"],
        queryFn: getEventTicket,
        enabled: !!dataEvent?._id,
    });

    const [cart, setCart] = useState<ICart[]>([]);

    const [isAddedToCart, setIsAddedToCart] = useState<Record<string, boolean>>(
        {},
    );

    useEffect(() => {
        if (!dataTicket) return;

        const initialState: Record<string, boolean> = {};
        dataTicket?.forEach((ticket: ITicket) => {
            initialState[`${ticket._id}`] = false;
        });

        setIsAddedToCart(initialState);
    }, [dataTicket]);

    const dataTicketInCart: ITicket[] = useMemo(() => {
        if (dataTicket) {
            return cart
                .map((cartItem) => {
                    return dataTicket.find(
                        (ticket: ITicket) => ticket._id === cartItem.ticket,
                    );
                })
                .filter((t): t is ITicket => t !== null);
        }
        return [];
    }, [cart, dataTicket]);

    const totalPrice = useMemo(
        () =>
            dataTicketInCart
                .map((item, idx) => Number(item?.price) * cart[idx].quantity)
                .reduce((a, b) => a + b, 0),
        [dataTicketInCart, cart],
    );

    const handleAddToCart = (ticket: string) => {
        setCart((prev) => [
            ...prev,
            {
                event: dataEvent._id as string,
                ticket,
                quantity: 1,
            },
        ]);
        setIsAddedToCart((prev) => ({
            ...prev,
            [ticket]: true,
        }));
    };

    const handleChangeQuantity = (
        type: "increment" | "decrement",
        idx: number,
    ) => {
        if (type === "increment") {
            if (
                cart[idx].quantity < (dataTicketInCart[idx].quantity as number)
            ) {
                setCart((prev) =>
                    prev.map((item, i) =>
                        i === idx
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    ),
                );
            }
        } else {
            if (cart[idx].quantity <= 1) {
                setCart((prev) => prev.filter((_, i) => i !== idx));
                setIsAddedToCart((prev) => ({
                    ...prev,
                    [`${dataTicketInCart[idx]._id}`]: false,
                }));
            } else {
                setCart((prev) =>
                    prev.map((item, i) =>
                        i === idx
                            ? {
                                  ...item,
                                  quantity: item.quantity - 1,
                              }
                            : item,
                    ),
                );
            }
        }
    };

    const createOrder = async (cart: ICart[]) => {
        const { data } = await orderServices.createOrder(cart);
        return data.data;
    };

    const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
        useMutation({
            mutationFn: createOrder,
            onError: (error: AxiosError<{ meta: { message: string } }>) => {
                const message = error.response!.data.meta.message;
                setToaster({
                    type: "error",
                    message,
                });
            },
            onSuccess: (result) => {
                const transactionToken = result.payment.token;
                (window as any).snap.pay(transactionToken);
            },
        });

    const handleCheckout = useCallback(() => {
        if (status !== "authenticated") {
            loginModal.onOpen();
            return;
        }

        // continue to checkout if user authenticated
        mutateCreateOrder(cart);
    }, [status, loginModal]);

    return {
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
    };
};

export default useDetailEvent;
