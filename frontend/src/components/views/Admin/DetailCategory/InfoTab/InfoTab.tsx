import { ICategory } from "@/types/Category";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Skeleton,
    Spinner,
    Textarea,
} from "@heroui/react";
import { Input } from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { use, useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
    dataCategory: ICategory;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateCategoryInfo,
        errorsUpdateCategoryInfo,
        handleSubmitUpdateCategoryInfo,
        resetUpdateCategoryInfo,
        setValueUpdateCategoryInfo,
    } = useInfoTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateCategoryInfo();
        }
    }, [isSuccessUpdate]);

    useEffect(() => {
        setValueUpdateCategoryInfo("name", `${dataCategory?.name}`);
        setValueUpdateCategoryInfo(
            "description",
            `${dataCategory?.description}`,
        );
    }, [dataCategory]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">
                    Category Information
                </h1>
                <p className="w-full text-small text-default-400">
                    Manage Information of this category
                </p>
            </CardHeader>
            <CardBody className="mt-4 p-0">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateCategoryInfo(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataCategory?.name}>
                        <Controller
                            name="name"
                            control={controlUpdateCategoryInfo}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="mt-2"
                                    label="Name"
                                    labelPlacement="outside"
                                    placeholder="Make it clear and concise"
                                    type="text"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateCategoryInfo.name !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateCategoryInfo.name?.message
                                    }
                                />
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataCategory?.description}>
                        <Controller
                            name="description"
                            control={controlUpdateCategoryInfo}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Describe this category"
                                    variant="bordered"
                                    isInvalid={
                                        errorsUpdateCategoryInfo.description !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateCategoryInfo.description
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
                        disabled={isPendingUpdate || !dataCategory._id}
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
