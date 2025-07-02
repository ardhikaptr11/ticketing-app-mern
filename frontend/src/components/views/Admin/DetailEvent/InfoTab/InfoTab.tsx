import { IEventForm } from "@/types/Event";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    DatePicker,
    Select,
    SelectItem,
    Skeleton,
    Spinner,
    Textarea,
} from "@heroui/react";
import { Input } from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";
import { I18nProvider } from "@react-aria/i18n";
import { currentDate, formatDate } from "@/utils/date";

interface PropTypes {
    dataEvent: IEventForm;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateEventInfo,
        dataCategory,
        errorsUpdateEventInfo,
        handleSubmitUpdateEventInfo,
        resetUpdateEventInfo,
        setValueUpdateEventInfo,
        slugValue,
        startDateValue,
    } = useInfoTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateEventInfo();
        }
    }, [isSuccessUpdate]);

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateEventInfo("name", `${dataEvent?.name}`);
            setValueUpdateEventInfo("slug", `${dataEvent?.slug}`);
            setValueUpdateEventInfo("category", `${dataEvent?.category}`);
            setValueUpdateEventInfo("startDate", formatDate(`${dataEvent?.startDate}`));
            setValueUpdateEventInfo("endDate", formatDate(`${dataEvent?.endDate}`));
            setValueUpdateEventInfo("isPublished", `${dataEvent?.isPublished}`);
            setValueUpdateEventInfo("isFeatured", `${dataEvent?.isFeatured}`);
            setValueUpdateEventInfo("description", `${dataEvent?.description}`);
        }
    }, [dataEvent]);


    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Information</h1>
                <p className="w-full text-small text-default-400">
                    Manage Information of this Event
                </p>
            </CardHeader>
            <CardBody className="mt-4 p-0">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateEventInfo(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataEvent?.name}>
                        <Controller
                            name="name"
                            control={controlUpdateEventInfo}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Name"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateEventInfo.name !== undefined
                                    }
                                    errorMessage={
                                        errorsUpdateEventInfo.name?.message
                                    }
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.slug}>
                        <Controller
                            name="slug"
                            control={controlUpdateEventInfo}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    isReadOnly
                                    label="Slug"
                                    value={slugValue}
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={
                                        errorsUpdateEventInfo.slug !== undefined
                                    }
                                    errorMessage={
                                        errorsUpdateEventInfo.slug?.message
                                    }
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.category}>
                        <Controller
                            name="category"
                            control={controlUpdateEventInfo}
                            render={({ field: { onChange, ...field } }) => (
                                <Autocomplete
                                    {...field}
                                    aria-label="Category selection"
                                    size="md"
                                    defaultItems={dataCategory?.data.data || []}
                                    defaultSelectedKey={dataEvent?.category}
                                    label="Category"
                                    placeholder="Search category here"
                                    variant="bordered"
                                    isInvalid={
                                        errorsUpdateEventInfo.category !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateEventInfo.category?.message
                                    }
                                    onSelectionChange={(value) =>
                                        onChange(value)
                                    }
                                >
                                    {(category: ICategory) => (
                                        <AutocompleteItem
                                            key={category._id}
                                            textValue={category.name}
                                        >
                                            {category.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.startDate}>
                        <Controller
                            name="startDate"
                            control={controlUpdateEventInfo}
                            render={({ field }) => (
                                <I18nProvider locale="en-GB">
                                    <DatePicker
                                        {...field}
                                        showMonthAndYearPickers
                                        hideTimeZone
                                        placeholderValue={currentDate}
                                        minValue={currentDate}
                                        label="Start Date"
                                        variant="bordered"
                                        hourCycle={24}
                                        granularity="minute"
                                        isInvalid={
                                            errorsUpdateEventInfo.startDate !==
                                            undefined
                                        }
                                        errorMessage={
                                            errorsUpdateEventInfo.startDate
                                                ?.message
                                        }
                                    />
                                </I18nProvider>
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.endDate}>
                        <Controller
                            name="endDate"
                            control={controlUpdateEventInfo}
                            render={({ field }) => (
                                <I18nProvider locale="en-GB">
                                    <DatePicker
                                        {...field}
                                        showMonthAndYearPickers
                                        hideTimeZone
                                        label="End Date"
                                        variant="bordered"
                                        hourCycle={24}
                                        granularity="minute"
                                        placeholderValue={startDateValue}
                                        minValue={startDateValue}
                                        isInvalid={
                                            errorsUpdateEventInfo.endDate !==
                                            undefined
                                        }
                                        errorMessage={
                                            errorsUpdateEventInfo.endDate
                                                ?.message
                                        }
                                    />
                                </I18nProvider>
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent}>
                        <Controller
                            name="isPublished"
                            control={controlUpdateEventInfo}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={
                                        errorsUpdateEventInfo.isPublished !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateEventInfo.isPublished
                                            ?.message
                                    }
                                    disallowEmptySelection
                                    selectionMode="single"
                                    defaultSelectedKeys={[
                                        dataEvent?.isPublished
                                            ? "true"
                                            : "false",
                                    ]}
                                >
                                    <SelectItem key="true" textValue="Publish">
                                        Publish
                                    </SelectItem>
                                    <SelectItem key="false" textValue="Draft">
                                        Draft
                                    </SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent}>
                        <Controller
                            name="isFeatured"
                            control={controlUpdateEventInfo}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Featured"
                                    variant="bordered"
                                    selectionMode="single"
                                    isInvalid={
                                        errorsUpdateEventInfo.isFeatured !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateEventInfo.isFeatured
                                            ?.message
                                    }
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataEvent?.isFeatured
                                            ? "true"
                                            : "false",
                                    ]}
                                >
                                    <SelectItem key="true" textValue="Featured">
                                        Featured
                                    </SelectItem>
                                    <SelectItem
                                        key="false"
                                        textValue="Not Featured"
                                    >
                                        Not Featured
                                    </SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.description}>
                        <Controller
                            name="description"
                            control={controlUpdateEventInfo}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    variant="bordered"
                                    isInvalid={
                                        errorsUpdateEventInfo.description !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateEventInfo.description
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
                        disabled={
                            isPendingUpdate ||
                            !dataEvent._id
                        }
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