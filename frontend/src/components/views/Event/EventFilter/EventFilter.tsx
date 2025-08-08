import React, { Fragment, useEffect } from "react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import { Autocomplete, AutocompleteItem, Skeleton } from "@heroui/react";
import { ICategory } from "@/types/Category";
import useChangeURL from "@/hooks/useChangeURL";
import { useRouter } from "next/router";

const EventFilter = () => {
    const { dataCategory, control, isSuccessGetCategory, setValue } =
        useEventFilter();

    const {
        query: { reset },
    } = useRouter();

    const {
        currentCategory,
        currentIsFeatured,
        currentIsOnline,
        handleChangeCategory,
        handleChangeIsFeatured,
        handleChangeIsOnline,
    } = useChangeURL();

    useEffect(() => {
        if (currentCategory !== "") setValue("category", `${currentCategory}`);
        if (currentIsFeatured !== "")
            setValue("isFeatured", `${currentIsFeatured}`);
        if (currentIsOnline !== "") setValue("isOnline", `${currentIsOnline}`);
    }, [isSuccessGetCategory]);

    useEffect(() => {
        if (reset === "true") {
            setValue("category", "");
            setValue("isFeatured", "");
            setValue("isOnline", "");
        }
    }, [reset]);

    const featuredStatus = [
        { label: "Featured", key: "true" },
        { label: "Not Featured", key: "false" },
    ];

    const eventType = [
        { label: "Online", key: "true" },
        { label: "Offline", key: "false" },
    ];

    return (
        <aside className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
            <h4 className="text-xl font-semibold">Filter</h4>
            <div className="mt-4 flex flex-col gap-4">
                {isSuccessGetCategory ? (
                    <Fragment>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field: { onChange, ...field } }) => (
                                <Autocomplete
                                    key={`${currentCategory}`}
                                    {...field}
                                    defaultSelectedKey={
                                        `${currentCategory}` || undefined
                                    }
                                    aria-label="Category selection"
                                    size="md"
                                    defaultItems={dataCategory?.data.data || []}
                                    label="Category"
                                    labelPlacement="outside"
                                    placeholder="Search category here"
                                    variant="bordered"
                                    onSelectionChange={(value) => {
                                        onChange(value);
                                        handleChangeCategory(
                                            value ? `${value}` : "",
                                        );
                                    }}
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
                        <Controller
                            name="isFeatured"
                            control={control}
                            render={({ field: { onChange, ...field } }) => (
                                <Autocomplete
                                    key={`${currentIsFeatured}`}
                                    {...field}
                                    defaultSelectedKey={
                                        `${currentIsFeatured}` || undefined
                                    }
                                    aria-label="Featured status selection"
                                    size="md"
                                    defaultItems={featuredStatus}
                                    label="Featured Status"
                                    labelPlacement="outside"
                                    placeholder="Featured / Not Featured"
                                    variant="bordered"
                                    onSelectionChange={(value) => {
                                        onChange(value);
                                        handleChangeIsFeatured(
                                            value ? `${value}` : "",
                                        );
                                    }}
                                >
                                    {(status) => (
                                        <AutocompleteItem
                                            key={status.key}
                                            textValue={status.label}
                                        >
                                            {status.label}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            )}
                        />
                        <Controller
                            name="isOnline"
                            control={control}
                            render={({ field: { onChange, ...field } }) => (
                                <Autocomplete
                                    key={`${currentIsOnline}`}
                                    {...field}
                                    defaultSelectedKey={
                                        `${currentIsOnline}` || undefined
                                    }
                                    aria-label="Event type selection"
                                    size="md"
                                    defaultItems={eventType}
                                    label="Event Type"
                                    labelPlacement="outside"
                                    placeholder="Online / Offline"
                                    variant="bordered"
                                    onSelectionChange={(value) => {
                                        onChange(value);
                                        handleChangeIsOnline(
                                            value ? `${value}` : "",
                                        );
                                    }}
                                >
                                    {(type) => (
                                        <AutocompleteItem
                                            key={type.key}
                                            textValue={type.label}
                                        >
                                            {type.label}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            )}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton
                                key={`skeleton-filter-input-${index}`}
                                className="h-14 w-full rounded-xl"
                            />
                        ))}
                    </Fragment>
                )}
            </div>
        </aside>
    );
};

export default EventFilter;
