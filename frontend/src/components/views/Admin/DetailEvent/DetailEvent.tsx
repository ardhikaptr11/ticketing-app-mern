import { useState } from "react";
import { Tab, Tabs } from "@heroui/react";
import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";

const DetailEvent = () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const {
        dataDefaultRegion,
        dataEvent,
        handleUpdateEvent,
        handleUpdateEventInfo,
        handleUpdateEventLocation,
        isPendingDefaultRegion,
        isPendingMutateUpdateEventInfo,
        isSuccessMutateUpdateEventInfo,
    } = useDetailEvent();

    const disabledTabs = hasUnsavedChanges || isPendingDefaultRegion ? ["info", "location"] : [];

    return (
        <Tabs aria-label="Options" disabledKeys={disabledTabs}>
            <Tab key="banner" title="Banner">
                <BannerTab
                    currentBanner={dataEvent?.banner}
                    onUpdate={handleUpdateEvent}
                    isPendingUpdate={isPendingMutateUpdateEventInfo}
                    isSuccessUpdate={isSuccessMutateUpdateEventInfo}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataEvent={dataEvent}
                    onUpdate={handleUpdateEventInfo}
                    isPendingUpdate={isPendingMutateUpdateEventInfo}
                    isSuccessUpdate={isSuccessMutateUpdateEventInfo}
                />
            </Tab>
            <Tab key="location" title="Location">
                <LocationTab
                    dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
                    dataEvent={dataEvent}
                    onUpdate={handleUpdateEventLocation}
                    isPendingDefaultRegion={isPendingDefaultRegion}
                    isPendingUpdate={isPendingMutateUpdateEventInfo}
                    isSuccessUpdate={isSuccessMutateUpdateEventInfo}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailEvent;
