import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface PropTypes {
    status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
    const router = useRouter();
    const { status } = props;

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
                        status === "success"
                            ? "/images/illustrations/success.svg"
                            : "/images/illustrations/pending.svg"
                    }
                    alt={
                        status === "success"
                            ? "Activation success"
                            : "Activation failed"
                    }
                    width={300}
                    height={300}
                />
            </div>
            <div className="mt-4 flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-danger-500">
                    {status === "success"
                        ? "Activation Success"
                        : "Activation Failed"}
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {status === "success"
                        ? "Thank you for registering an account in Zentix"
                        : "Confirmation code is invalid"}
                </p>
                <Button
                    className="mt-4 w-fit"
                    variant="bordered"
                    color="danger"
                    onPress={() => router.push("/")}
                >
                    Back To Home
                </Button>
            </div>
        </div>
    );
};

export default Activation;
