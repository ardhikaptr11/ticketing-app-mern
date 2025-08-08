import { ICart, ITicket } from "@/types/Ticket";
import { convertToIDR } from "@/utils/currency";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Spinner,
} from "@heroui/react";
import React, { Fragment } from "react";
import { IoCartOutline } from "react-icons/io5";

interface PropTypes {
    cart: ICart[];
    dataTicketInCart: ITicket[];
    handleChangeQuantity: (
        type: "increment" | "decrement",
        idx: number,
    ) => void;
    handleCheckout: () => void;
    isPending: boolean;
    totalPrice: number;
}

const CartSidebar = (props: PropTypes) => {
    const {
        cart,
        dataTicketInCart,
        handleChangeQuantity,
        handleCheckout,
        isPending,
        totalPrice,
    } = props;

    return (
        <Card radius="lg" className="border-none p-6 lg:sticky lg:top-[80px]">
            <CardHeader className="flex items-center gap-2 font-bold text-foreground-500">
                <IoCartOutline className="text-2xl" />
                <h2 className="text-xl font-semibold">Cart</h2>
            </CardHeader>
            <CardBody className="gap-2">
                {cart.length === 0 ? (
                    <p className="text-foreground-500">Your cart is empty</p>
                ) : (
                    dataTicketInCart?.map((item: ITicket, idx) => (
                        <div
                            key={`price-card-${idx}`}
                            className="flex flex-col items-start text-foreground-500 lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-foreground-700">
                                    {item?.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="md"
                                        variant="bordered"
                                        className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                                        onPress={() =>
                                            handleChangeQuantity(
                                                "decrement",
                                                idx,
                                            )
                                        }
                                    >
                                        -
                                    </Button>
                                    <span className="text-md font-bold text-foreground-500">
                                        {cart[idx].quantity}
                                    </span>
                                    <Button
                                        size="md"
                                        variant="bordered"
                                        className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                                        onPress={() =>
                                            handleChangeQuantity(
                                                "increment",
                                                idx,
                                            )
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                            <p className="font-bold">
                                {convertToIDR(
                                    Number(item?.price) * cart[idx].quantity,
                                )}{" "}
                            </p>
                        </div>
                    ))
                )}

                {cart.length !== 0 && (
                    <Fragment>
                        <Divider />
                        <div className="mt-2 flex items-center justify-between font-bold text-foreground-500">
                            <h4 className="text-foreground-700">Total:</h4>
                            <p>{convertToIDR(totalPrice)}</p>
                        </div>
                    </Fragment>
                )}
                <Button
                    fullWidth
                    color="danger"
                    size="md"
                    disabled={cart.length === 0 || isPending}
                    className="mt-4 disabled:bg-danger-200"
                    onPress={handleCheckout}
                >
                    {isPending ? (
                        <Spinner size="sm" color="white" variant="wave" />
                    ) : (
                        "Checkout"
                    )}
                </Button>
            </CardBody>
        </Card>
    );
};

export default CartSidebar;
