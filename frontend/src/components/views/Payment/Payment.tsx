import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import usePayment from "./usePayment";

const Payment = () => {
    const {
        isReady,
        push,
        query: { order_id, transaction_status },
    } = useRouter();

    const { mutateUpdateOrderStatus, normalizeStatus, statusMessage } =
        usePayment();

    useEffect(() => {
        if (isReady) mutateUpdateOrderStatus();
    }, [isReady]);

    return (
        <div className="flex w-screen flex-col">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/zentix.png"
                    alt="Logo"
                    width={120}
                    height={120}
                />
                <Image
                    src={
                        transaction_status === "settlement"
                            ? "/images/illustrations/success.svg"
                            : "/images/illustrations/pending.svg"
                    }
                    alt={`Payment ${transaction_status === "pending" ? "in" : ""} ${transaction_status}`}
                    width={300}
                    height={300}
                />
            </div>
            <div className="mt-4 flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold capitalize text-danger-500">
                    Payment{" "}
                    {transaction_status === "pending"
                        ? "in progress"
                        : normalizeStatus(`${transaction_status}`)}
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {statusMessage}
                </p>
                <Button
                    className="mt-4 w-fit"
                    variant="bordered"
                    color="danger"
                    onPress={
                        transaction_status !== "cancelled"
                            ? transaction_status === "pending"
                                ? () => push(`/member/transactions`)
                                : () => push(`/member/transactions/${order_id}`)
                            : () => push("/")
                    }
                >
                    {transaction_status === "settlement" ||
                    transaction_status === "pending"
                        ? "Check Transaction"
                        : "Back To Home"}
                </Button>
            </div>
        </div>
    );
};

export default Payment;
