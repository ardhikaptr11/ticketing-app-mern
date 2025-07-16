import { IEventForm, IRegency } from "@/types/Event";
import {
    Autocomplete,
    AutocompleteItem,
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
import useLocationTab from "./useLocationTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
    dataDefaultRegion: string;
    dataEvent: IEventForm;
    isPendingDefaultRegion: boolean;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
    const {
        dataDefaultRegion,
        dataEvent,
        isPendingDefaultRegion,
        isPendingUpdate,
        isSuccessUpdate,
        onUpdate,
    } = props;

    const {
        controlUpdateEventLocation,
        dataRegion,
        errorsUpdateEventLocation,
        handleFetchGeolocation,
        handleSearchRegion,
        handleSubmitUpdateEventLocation,
        isPendingMutateFetchGeolocation,
        isOnline,
        searchRegency,
        setValueUpdateEventLocation,
    } = useLocationTab();

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateEventLocation("isOnline", `${dataEvent?.isOnline}`);
            setValueUpdateEventLocation(
                "address",
                `${dataEvent?.location?.address}`,
            );
            setValueUpdateEventLocation(
                "region",
                `${dataEvent?.location?.region}`,
            );
            setValueUpdateEventLocation(
                "latitude",
                `${dataEvent?.location?.coordinates[0]}`,
            );
            setValueUpdateEventLocation(
                "longitude",
                `${dataEvent?.location?.coordinates[1]}`,
            );
        }
    }, [dataEvent, isSuccessUpdate]);

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
                    onSubmit={handleSubmitUpdateEventLocation(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataEvent}>
                        <Controller
                            name="isOnline"
                            control={controlUpdateEventLocation}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Online / Offline"
                                    variant="bordered"
                                    selectionMode="single"
                                    isInvalid={
                                        errorsUpdateEventLocation.isOnline !==
                                        undefined
                                    }
                                    errorMessage={
                                        errorsUpdateEventLocation.isOnline
                                            ?.message
                                    }
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataEvent?.isOnline ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" textValue="Online">
                                        Online
                                    </SelectItem>
                                    <SelectItem key="false" textValue="Offline">
                                        Offline
                                    </SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>

                    {isOnline === "false" && (
                        <>
                            <Skeleton isLoaded={!!dataEvent?.location?.address}>
                                <Controller
                                    name="address"
                                    control={controlUpdateEventLocation}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Address"
                                            variant="bordered"
                                            autoComplete="off"
                                            isInvalid={
                                                errorsUpdateEventLocation.address !==
                                                undefined
                                            }
                                            errorMessage={
                                                errorsUpdateEventLocation
                                                    .address?.message
                                            }
                                        />
                                    )}
                                />
                            </Skeleton>

                            <Skeleton
                                isLoaded={
                                    !!dataEvent?.location?.region
                                        ? !isPendingDefaultRegion
                                        : !dataDefaultRegion
                                }
                            >
                                {!isPendingDefaultRegion ||
                                !dataDefaultRegion ? (
                                    <Controller
                                        name="region"
                                        control={controlUpdateEventLocation}
                                        render={({
                                            field: { onChange, ...field },
                                        }) => (
                                            <Autocomplete
                                                {...field}
                                                // key={regionId}
                                                aria-label="City selection"
                                                size="md"
                                                defaultItems={
                                                    dataRegion?.data.data &&
                                                    searchRegency !== ""
                                                        ? dataRegion?.data.data
                                                        : []
                                                }
                                                defaultInputValue={
                                                    dataDefaultRegion
                                                }
                                                label="City"
                                                placeholder="Search city here"
                                                variant="bordered"
                                                onInputChange={(search) =>
                                                    handleSearchRegion(search)
                                                }
                                                isInvalid={
                                                    errorsUpdateEventLocation.region !==
                                                    undefined
                                                }
                                                errorMessage={
                                                    errorsUpdateEventLocation
                                                        .region?.message
                                                }
                                                onSelectionChange={(value) => {
                                                    value &&
                                                        (onChange(value),
                                                        handleFetchGeolocation());
                                                }}
                                            >
                                                {(regency: IRegency) => (
                                                    <AutocompleteItem
                                                        key={`${regency.id}`}
                                                        textValue={regency.name}
                                                    >
                                                        {regency.name}
                                                    </AutocompleteItem>
                                                )}
                                            </Autocomplete>
                                        )}
                                    />
                                ) : (
                                    <div className="h-14 w-full" />
                                )}
                            </Skeleton>

                            <Skeleton
                                isLoaded={
                                    !!dataEvent?.location?.region
                                        ? !isPendingDefaultRegion
                                        : !dataDefaultRegion
                                }
                            >
                                <Controller
                                    name="latitude"
                                    control={controlUpdateEventLocation}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Latitude"
                                            variant="bordered"
                                            autoComplete="off"
                                            isInvalid={
                                                errorsUpdateEventLocation.latitude !==
                                                undefined
                                            }
                                            errorMessage={
                                                errorsUpdateEventLocation
                                                    .latitude?.message
                                            }
                                            endContent={
                                                isPendingMutateFetchGeolocation && (
                                                    <Spinner
                                                        color="danger"
                                                        size="sm"
                                                    />
                                                )
                                            }
                                            isReadOnly
                                        />
                                    )}
                                />
                            </Skeleton>

                            <Skeleton
                                isLoaded={
                                    !!dataEvent?.location?.region
                                        ? !isPendingDefaultRegion
                                        : !dataDefaultRegion
                                }
                            >
                                <Controller
                                    name="longitude"
                                    control={controlUpdateEventLocation}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Longitude"
                                            variant="bordered"
                                            autoComplete="off"
                                            isInvalid={
                                                errorsUpdateEventLocation.longitude !==
                                                undefined
                                            }
                                            errorMessage={
                                                errorsUpdateEventLocation
                                                    .longitude?.message
                                            }
                                            endContent={
                                                isPendingMutateFetchGeolocation && (
                                                    <Spinner
                                                        color="danger"
                                                        size="sm"
                                                    />
                                                )
                                            }
                                            isReadOnly
                                        />
                                    )}
                                />
                            </Skeleton>
                        </>
                    )}

                    <Button
                        type="submit"
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        disabled={isPendingUpdate || !dataEvent._id}
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

export default LocationTab;
