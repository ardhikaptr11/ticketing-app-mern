import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const RegisterSuccess = () => {
  const router = useRouter()

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
                    src="/images/illustrations/email-sent.svg"
                    alt="Registration success"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center mt-4">
                <h1 className="text-3xl font-bold text-danger-500">
                    Create Account Success
                </h1>
                <p className="text-xl font-bold text-default-500">
                    Check your email for account activation
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

export default RegisterSuccess;
