import {
    Button,
    Card,
    CardBody,
    Spinner,
} from "@heroui/react";
import { Input } from "@heroui/react";
import useSecurityTab from "./useSecurityTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { IProfile } from "@/types/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface PropTypes {
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const SecurityTab = (props: PropTypes) => {
    const { onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateProfilePassword,
        errorsUpdateProfilePassword,
        handleSubmitUpdateProfilePassword,
        handleVisiblePassword,
        isVisible: { currentPassword, newPassword, confirmPassword },
        resetUpdateProfilePassword,
    } = useSecurityTab();

    useEffect(() => {
        if (isSuccessUpdate) resetUpdateProfilePassword();
    }, [isSuccessUpdate]);

    const PASSWORD_REQUIREMENTS = [
        "At least 8 characters long",
        "At least one lowercase",
        "At least one uppercase",
        "At least one special character",
        "Do not use the same password",
    ];

    return (
        <Card className="max-w-full">
            <CardBody className="gap-8 p-6 lg:flex-row">
                <form
                    className="order-2 w-full lg:order-1"
                    onSubmit={handleSubmitUpdateProfilePassword(onUpdate)}
                >
                    <h1 className="text-xl font-bold">Security</h1>
                    <p className="mb-4 text-small text-default-400">
                        Manage security of your account.
                    </p>
                    <div className="flex flex-col gap-4">
                        <Controller
                            name="currentPassword"
                            control={controlUpdateProfilePassword}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Current Password"
                                    labelPlacement="outside"
                                    placeholder="Enter your current password here"
                                    type={currentPassword ? "text" : "password"}
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateProfilePassword.currentPassword !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateProfilePassword
                                            .currentPassword?.message
                                    }
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="self-center focus:outline-none"
                                            type="button"
                                            onClick={() =>
                                                handleVisiblePassword(
                                                    "currentPassword",
                                                )
                                            }
                                        >
                                            {currentPassword ? (
                                                <FaEye className="pointer-events-none text-xl text-default-400" />
                                            ) : (
                                                <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                                            )}
                                        </button>
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="newPassword"
                            control={controlUpdateProfilePassword}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="New Password"
                                    labelPlacement="outside"
                                    placeholder="Enter your new password here"
                                    type={newPassword ? "text" : "password"}
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateProfilePassword.newPassword !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateProfilePassword.newPassword
                                            ?.message
                                    }
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="self-center focus:outline-none"
                                            type="button"
                                            onClick={() =>
                                                handleVisiblePassword(
                                                    "newPassword",
                                                )
                                            }
                                        >
                                            {newPassword ? (
                                                <FaEye className="pointer-events-none text-xl text-default-400" />
                                            ) : (
                                                <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                                            )}
                                        </button>
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={controlUpdateProfilePassword}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Confirmation Password"
                                    labelPlacement="outside"
                                    placeholder="Enter your current password here"
                                    type={confirmPassword ? "text" : "password"}
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateProfilePassword.confirmPassword !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateProfilePassword
                                            .confirmPassword?.message
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
                                            {confirmPassword ? (
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
                            className="mt-2 w-fit disabled:bg-default-500"
                            disabled={isPendingUpdate}
                        >
                            {isPendingUpdate ? (
                                <Spinner color="white" size="sm" />
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
                <div className="order-1 w-full rounded-lg bg-danger px-6 py-4 lg:order-2 lg:w-[40%]">
                    <h2 className="text-xl font-bold text-white">
                        Password Requirements
                    </h2>
                    <p className="mt-2 text-sm text-default-100 dark:text-white">
                        Here are some things to keep in mind when creating a
                        strong password:
                    </p>
                    <ul className="ml-4 mt-4 list-outside list-disc">
                        {PASSWORD_REQUIREMENTS.map((requirement, index) => (
                            <li
                                key={`requirement-${index}`}
                                className="mt-2 text-sm text-default-100 dark:text-white"
                            >
                                {requirement}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
};

export default SecurityTab;

{
    /* <div className="flex flex-col gap-8 lg:flex-row">
</div> */
}
