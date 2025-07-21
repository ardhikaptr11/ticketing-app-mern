import {
    Autocomplete,
    AutocompleteItem,
    Button,
    DatePicker,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Spinner,
    Textarea,
} from "@heroui/react";
import React, { Fragment, useEffect } from "react";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { ICategory } from "@/types/Category";
import { I18nProvider } from "@react-aria/i18n";
import { IRegency } from "@/types/Event";
import { currentDate } from "@/utils/date";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchEvents: () => void;
}

const AddEventModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchEvents } = props;

    const {
        control,
        dataCategory,
        dataRegion,
        errors,
        handleAddEvent,
        handleDeleteBanner,
        handleFetchGeolocation,
        handleOnClose,
        handleSearchRegion,
        handleSubmitForm,
        handleUploadBanner,
        isPendingMutateFetchGeolocation,
        isOnline,
        isPendingMutateAddEvent,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        isSuccessMutateAddEvent,
        preview,
        searchRegency,
        slugValue,
        startDateValue,
    } = useAddEventModal();

    useEffect(() => {
        if (isSuccessMutateAddEvent) {
            onClose();
            refetchEvents();
        }
    }, [isSuccessMutateAddEvent]);

    const disabledSubmit =
        isPendingMutateAddEvent ||
        isPendingMutateUploadFile ||
        isPendingMutateDeleteFile;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            scrollBehavior="inside"
            onClose={() => handleOnClose(onClose)}
        >
            <form onSubmit={handleSubmitForm(handleAddEvent)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add New Event</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <div className="mb-4 flex flex-col gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Name"
                                            variant="bordered"
                                            autoComplete="off"
                                            isInvalid={
                                                errors.name !== undefined
                                            }
                                            errorMessage={errors.name?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="slug"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            isReadOnly
                                            label="Slug"
                                            value={slugValue}
                                            variant="bordered"
                                            autoComplete="off"
                                            isInvalid={
                                                errors.slug !== undefined
                                            }
                                            errorMessage={errors.slug?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="category"
                                    control={control}
                                    render={({
                                        field: { onChange, ...field },
                                    }) => (
                                        <Autocomplete
                                            {...field}
                                            aria-label="Category selection"
                                            size="md"
                                            defaultItems={
                                                dataCategory?.data.data || []
                                            }
                                            label="Category"
                                            placeholder="Search category here"
                                            variant="bordered"
                                            isInvalid={
                                                errors.category !== undefined
                                            }
                                            errorMessage={
                                                errors.category?.message
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

                                <Controller
                                    name="startDate"
                                    control={control}
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
                                                    errors.startDate !==
                                                    undefined
                                                }
                                                errorMessage={
                                                    errors.startDate?.message
                                                }
                                            />
                                        </I18nProvider>
                                    )}
                                />

                                <Controller
                                    name="endDate"
                                    control={control}
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
                                                placeholderValue={
                                                    startDateValue
                                                }
                                                minValue={startDateValue}
                                                isInvalid={
                                                    errors.endDate !== undefined
                                                }
                                                errorMessage={
                                                    errors.endDate?.message
                                                }
                                                disableAnimation={true}
                                            />
                                        </I18nProvider>
                                    )}
                                />

                                <Controller
                                    name="isPublished"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Status"
                                            variant="bordered"
                                            isInvalid={
                                                errors.isPublished !== undefined
                                            }
                                            errorMessage={
                                                errors.isPublished?.message
                                            }
                                            disallowEmptySelection
                                            selectionMode="single"
                                        >
                                            <SelectItem
                                                key="true"
                                                textValue="Publish"
                                            >
                                                Publish
                                            </SelectItem>
                                            <SelectItem
                                                key="false"
                                                textValue="Draft"
                                            >
                                                Draft
                                            </SelectItem>
                                        </Select>
                                    )}
                                />

                                <Controller
                                    name="isFeatured"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Featured"
                                            variant="bordered"
                                            selectionMode="single"
                                            isInvalid={
                                                errors.isFeatured !== undefined
                                            }
                                            errorMessage={
                                                errors.isFeatured?.message
                                            }
                                            disallowEmptySelection
                                        >
                                            <SelectItem
                                                key="true"
                                                textValue="Featured"
                                            >
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

                                <Controller
                                    name="isOnline"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Online / Offline"
                                            variant="bordered"
                                            selectionMode="single"
                                            isInvalid={
                                                errors.isOnline !== undefined
                                            }
                                            errorMessage={
                                                errors.isOnline?.message
                                            }
                                            disallowEmptySelection
                                        >
                                            <SelectItem
                                                key="true"
                                                textValue="Online"
                                            >
                                                Online
                                            </SelectItem>
                                            <SelectItem
                                                key="false"
                                                textValue="Offline"
                                            >
                                                Offline
                                            </SelectItem>
                                        </Select>
                                    )}
                                />

                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Description"
                                            variant="bordered"
                                            isInvalid={
                                                errors.description !== undefined
                                            }
                                            errorMessage={
                                                errors.description?.message
                                            }
                                        />
                                    )}
                                />
                            </div>
                            {isOnline === "false" && (
                                <Fragment>
                                    <p className="text-sm font-bold">
                                        Location
                                    </p>
                                    <div className="mb-4 flex flex-col gap-4">
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Address"
                                                    variant="bordered"
                                                    autoComplete="off"
                                                    isInvalid={
                                                        errors.address !==
                                                        undefined
                                                    }
                                                    errorMessage={
                                                        errors.address?.message
                                                    }
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="region"
                                            control={control}
                                            render={({
                                                field: { onChange, ...field },
                                            }) => (
                                                <Autocomplete
                                                    {...field}
                                                    aria-label="City selection"
                                                    size="md"
                                                    defaultItems={
                                                        dataRegion?.data.data &&
                                                        searchRegency !== ""
                                                            ? dataRegion?.data
                                                                  .data
                                                            : []
                                                    }
                                                    label="City"
                                                    placeholder="Search city here"
                                                    variant="bordered"
                                                    onInputChange={(search) =>
                                                        handleSearchRegion(
                                                            search,
                                                        )
                                                    }
                                                    isInvalid={
                                                        errors.region !==
                                                        undefined
                                                    }
                                                    errorMessage={
                                                        errors.region?.message
                                                    }
                                                    onSelectionChange={(
                                                        value,
                                                    ) => {
                                                        value &&
                                                            (onChange(value),
                                                            handleFetchGeolocation());
                                                    }}
                                                >
                                                    {(regency: IRegency) => (
                                                        <AutocompleteItem
                                                            key={regency.id}
                                                            textValue={
                                                                regency.name
                                                            }
                                                        >
                                                            {regency.name}
                                                        </AutocompleteItem>
                                                    )}
                                                </Autocomplete>
                                            )}
                                        />

                                        <Controller
                                            name="latitude"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Latitude"
                                                    variant="bordered"
                                                    autoComplete="off"
                                                    isInvalid={
                                                        errors.latitude !==
                                                        undefined
                                                    }
                                                    errorMessage={
                                                        errors.latitude?.message
                                                    }
                                                    endContent={
                                                        isPendingMutateFetchGeolocation && (
                                                            <Spinner
                                                                color="danger"
                                                                size="sm"
                                                            />
                                                        )
                                                    }
                                                    isDisabled
                                                    isReadOnly
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="longitude"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Longitude"
                                                    variant="bordered"
                                                    autoComplete="off"
                                                    isInvalid={
                                                        errors.longitude !==
                                                        undefined
                                                    }
                                                    errorMessage={
                                                        errors.longitude
                                                            ?.message
                                                    }
                                                    endContent={
                                                        isPendingMutateFetchGeolocation && (
                                                            <Spinner
                                                                color="danger"
                                                                size="sm"
                                                            />
                                                        )
                                                    }
                                                    isDisabled
                                                    isReadOnly
                                                />
                                            )}
                                        />
                                    </div>
                                </Fragment>
                            )}
                            <p className="text-sm font-bold">Banner</p>
                            <Controller
                                name="banner"
                                control={control}
                                render={({
                                    field: { onChange, value, ...field },
                                }) => (
                                    <InputFile
                                        {...field}
                                        onDelete={() =>
                                            handleDeleteBanner(onChange)
                                        }
                                        onUpload={(files) =>
                                            handleUploadBanner(files, onChange)
                                        }
                                        isUploading={isPendingMutateUploadFile}
                                        isDeleting={isPendingMutateDeleteFile}
                                        isInvalid={errors.banner !== undefined}
                                        errorMessage={errors.banner?.message}
                                        preview={
                                            typeof preview === "string"
                                                ? preview
                                                : ""
                                        }
                                        isDropable
                                    />
                                )}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="flat"
                            color="danger"
                            onPress={() => handleOnClose(onClose)}
                            disabled={disabledSubmit}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="danger"
                            disabled={disabledSubmit}
                            className="disabled:bg-default-500"
                        >
                            {isPendingMutateAddEvent ? (
                                <Spinner color="white" size="sm" />
                            ) : (
                                "Add Event"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddEventModal;
