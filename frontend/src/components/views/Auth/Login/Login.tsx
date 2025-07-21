import Image from "next/image";
import { Card, CardBody, Link, Input, Button, Spinner } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

import useLogin from "../Login/useLogin";
import { useRouter } from "next/router";

const Login = () => {
    const { push } = useRouter();

    const {
        isVisible,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    } = useLogin();

    return (
        <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
            <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
                <Image
                    src="/images/general/zentix.png"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="cursor-pointer"
                    onClick={() => push("/")}
                />
                <Image
                    src="/images/illustrations/login.svg"
                    alt="Login"
                    width={1024}
                    height={1024}
                    className="w-2/3 lg:w-full"
                    priority
                />
            </div>
            <Card>
                <CardBody className="p-8">
                    <h2 className="text-2xl font-bold text-danger-500">
                        Login
                    </h2>
                    <p className="mb-4 mt-2 text-sm">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            href="/auth/register"
                            className="text-sm font-semibold text-danger-400 hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                    <form
                        className="flex w-80 flex-col gap-4"
                        onSubmit={handleSubmit(handleLogin)}
                    >
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

                        <Button
                            type="submit"
                            color="danger"
                            size="lg"
                            className="mt-4"
                            disabled={isPendingLogin}
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
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
