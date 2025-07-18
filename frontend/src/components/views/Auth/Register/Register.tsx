import Image from "next/image";
import {
    Card,
    CardBody,
    Link,
    Input,
    Button,
    Spinner,
    Tooltip,
} from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

import useRegister from "../Register/useRegister";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

const Register = () => {
    const {
        isVisible,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors,
    } = useRegister();

    const [isFocused, setIsFocused] = useState(false);

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
            <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
                <Image
                    src="/images/general/zentix.png"
                    alt="Zentix logo"
                    width={120}
                    height={120}
                    priority
                />
                <Image
                    src="/images/illustrations/login.svg"
                    alt="Login"
                    width={1024}
                    height={1024}
                    className="w-2/3 lg:w-full"
                />
            </div>
            <Card>
                <CardBody className="p-8">
                    <h2 className="text-2xl font-bold text-danger-500">
                        Create Account
                    </h2>
                    <p className="mb-4 mt-2 text-sm">
                        Have an account?&nbsp;
                        <Link
                            href="/auth/login"
                            className="text-sm font-semibold text-danger-400 hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                    <form
                        className="flex w-80 flex-col gap-4"
                        onSubmit={handleSubmit(handleRegister)}
                    >
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Fullname"
                                    type="text"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.fullName !== undefined}
                                    errorMessage={errors.fullName?.message}
                                />
                            )}
                        />

                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Username"
                                    type="text"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.username !== undefined}
                                    errorMessage={errors.username?.message}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Email"
                                    type="text"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.email !== undefined}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Tooltip
                                    placement={isMobile ? "top" : "right"}
                                    isOpen={isMobile ? isFocused : undefined}
                                    offset={10}
                                    content={
                                        <div className="max-w-[250px] p-2">
                                            <h3 className="text-small font-bold">
                                                Required
                                            </h3>
                                            <p className="text-tiny">
                                                Password must include uppercase,
                                                number, and symbol (min 8 chars)
                                            </p>
                                        </div>
                                    }
                                    showArrow
                                >
                                    <div className="w-full">
                                        <Input
                                            {...field}
                                            label="Password"
                                            type={
                                                isVisible.password
                                                    ? "text"
                                                    : "password"
                                            }
                                            variant="bordered"
                                            autoComplete="off"
                                            isInvalid={!!errors.password}
                                            errorMessage={
                                                errors.password?.message
                                            }
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            endContent={
                                                <button
                                                    aria-label="toggle password visibility"
                                                    className="self-center focus:outline-none"
                                                    type="button"
                                                    onClick={() =>
                                                        handleVisiblePassword(
                                                            "password",
                                                        )
                                                    }
                                                >
                                                    {isVisible.password ? (
                                                        <FaEye className="pointer-events-none text-xl text-default-400" />
                                                    ) : (
                                                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                                                    )}
                                                </button>
                                            }
                                        />
                                    </div>
                                </Tooltip>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Confirmation Password"
                                    type={
                                        isVisible.confirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errors.confirmPassword !== undefined
                                    }
                                    errorMessage={
                                        errors.confirmPassword?.message
                                    }
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="self-center focus:outline-none"
                                            type="button"
                                            onClick={() =>
                                                handleVisiblePassword(
                                                    "confirmPassword",
                                                )
                                            }
                                        >
                                            {isVisible.confirmPassword ? (
                                                <FaEye className="pointer-events-none text-xl text-default-400" />
                                            ) : (
                                                <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                                            )}
                                        </button>
                                    }
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            color="danger"
                            size="lg"
                            className="mt-4"
                            disabled={isPendingRegister}
                        >
                            {isPendingRegister ? (
                                <Spinner
                                    color="white"
                                    size="sm"
                                    variant="dots"
                                />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;
