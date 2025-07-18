import { IBanner } from "@/types/Banner";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Select,
    SelectItem,
    Skeleton,
    Spinner,
} from "@heroui/react";
import { Input } from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
    dataBanner: IBanner;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateBannerInfo,
        errorsUpdateBannerInfo,
        handleSubmitUpdateBannerInfo,
        resetUpdateBannerInfo,
        setValueUpdateBannerInfo,
    } = useInfoTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateBannerInfo();
        }
    }, [isSuccessUpdate]);

    useEffect(() => {
        if (dataBanner) {
            setValueUpdateBannerInfo("title", `${dataBanner?.title}`);
            setValueUpdateBannerInfo("isShow", `${dataBanner?.isShow}`);
        }
    }, [dataBanner]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Banner Information</h1>
                <p className="w-full text-small text-default-400">
                    Manage Information of this banner
                </p>
            </CardHeader>
            <CardBody className="mt-4 p-0">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateBannerInfo(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataBanner?.title}>
                        <Controller
                            name="title"
                            control={controlUpdateBannerInfo}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="mt-2"
                                    label="Name"
                                    labelPlacement="outside"
                                    type="text"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateBannerInfo.title !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateBannerInfo.title?.message
                                    }
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataBanner}>
                        <Controller
                            name="isShow"
                            control={controlUpdateBannerInfo}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={
                                        errorsUpdateBannerInfo.isShow !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateBannerInfo.isShow?.message
                                    }
                                    disallowEmptySelection
                                    selectionMode="single"
                                    defaultSelectedKeys={[
                                        dataBanner?.isShow ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" textValue="Showing">
                                        Showing
                                    </SelectItem>
                                    <SelectItem
                                        key="false"
                                        textValue="Not Showing"
                                    >
                                        Not Showing
                                    </SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>

                    <Button
                        type="submit"
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        disabled={isPendingUpdate || !dataBanner._id}
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
