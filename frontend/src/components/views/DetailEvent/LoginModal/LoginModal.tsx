import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import useLoginModal from "./useLoginModal";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const LoginModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange } = props;

    const {
        isVisible,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleLogin,
        handleOnClose,
        isPendingLogin,
        isSuccessMutateLogin,
        errors,
    } = useLoginModal();

    useEffect(() => {
        if (isSuccessMutateLogin) onClose();
    }, [isSuccessMutateLogin]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
            onClose={() => handleOnClose(onClose)}
        >
            <form
                className="flex w-80 flex-col gap-4"
                onSubmit={handleSubmit(handleLogin)}
            >
                <ModalContent>
                    <ModalHeader>
                        <div className="flex w-full flex-col items-center gap-2">
                            <Image
                                src="/images/illustrations/login.svg"
                                alt="Login"
                                width={200}
                                height={200}
                                priority
                            />
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-danger-500">
                                    Sign In to Continue
                                </h2>
                                <p className="mt-2 text-sm">
                                    Don&apos;t have an account?&nbsp;
                                    <Link
                                        href="/auth/register"
                                        className="text-sm font-semibold text-danger-400 hover:underline"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <Controller
                            name="identifier"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Email / Username"
                                    type="text"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.identifier !== undefined}
                                    errorMessage={errors.identifier?.message}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Password"
                                    type={isVisible ? "text" : "password"}
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.password !== undefined}
                                    errorMessage={errors.password?.message}
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="self-center focus:outline-none"
                                            type="button"
                                            onClick={handleVisiblePassword}
                                        >
                                            {isVisible ? (
                                                <FaEye className="pointer-events-none text-xl text-default-400" />
                                            ) : (
                                                <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                                            )}
                                        </button>
                                    }
                                />
                            )}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            color="danger"
                            size="lg"
                            disabled={isPendingLogin}
                            fullWidth
                        >
                            {isPendingLogin ? (
                                <Spinner
                                    color="white"
                                    size="sm"
                                    variant="dots"
                                />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default LoginModal;
