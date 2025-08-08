import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Skeleton,
    Spinner,
} from "@heroui/react";
import { Input } from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { IProfile } from "@/types/Auth";

interface PropTypes {
    dataProfile: IProfile;
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateProfileInfo,
        errorsUpdateProfileInfo,
        handleSubmitUpdateProfileInfo,
        resetUpdateProfileInfo,
        setValueUpdateProfileInfo,
    } = useInfoTab();

    useEffect(() => {
        if (isSuccessUpdate) resetUpdateProfileInfo();
    }, [isSuccessUpdate]);

    useEffect(() => {
        if (dataProfile)
            setValueUpdateProfileInfo("fullName", `${dataProfile?.fullName}`);
    }, [dataProfile]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">
                    Account Information
                </h1>
                <p className="w-full text-small text-default-400">
                    Manage Information of your account.
                </p>
            </CardHeader>
            <CardBody className="p-0">
                <form
                    className="flex flex-col gap-4 p-3"
                    onSubmit={handleSubmitUpdateProfileInfo(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataProfile?.username}>
                        <Input
                            label="Username"
                            labelPlacement="outside"
                            defaultValue={dataProfile?.username}
                            isReadOnly
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataProfile?.email}>
                        <Input
                            label="Email"
                            labelPlacement="outside"
                            defaultValue={dataProfile?.email}
                            isReadOnly
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataProfile?.role}>
                        <Input
                            label="Role"
                            labelPlacement="outside"
                            defaultValue={
                                (dataProfile?.role === "user" && "Member") || ""
                            }
                            isReadOnly
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataProfile?.fullName}>
                        <Controller
                            name="fullName"
                            control={controlUpdateProfileInfo}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Name"
                                    labelPlacement="outside"
                                    placeholder="Enter your full name here"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateProfileInfo?.fullName !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateProfileInfo?.fullName
                                            ?.message
                                    }
                                />
                            )}
                        />
                    </Skeleton>

                    <Button
                        type="submit"
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        disabled={isPendingUpdate}
                    >
                        {isPendingUpdate ? (
                            <Spinner color="white" size="sm" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default InfoTab;
