import { Tab, Tabs } from "@heroui/react";
import React, { useState } from "react";
import CoverTab from "./BannerTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";

const DetailEvent = () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const {
        dataDefaultRegion,
        dataEvent,
        handleUpdateEventInfo,
        handleUpdateEventLocation,
        isPendingDefaultRegion,
        isPendingMutateUpdateEventInfo,
        isSuccessMutateUpdateEventInfo,
    } = useDetailEvent();

    const disabledTabs = hasUnsavedChanges ? ["info", "location"] : [];

    return (
        <Tabs aria-label="Options" disabledKeys={disabledTabs}>
            <Tab key="banner" title="Banner">
                <CoverTab
                    currentBanner={dataEvent?.banner}
                    onUpdate={handleUpdateEventInfo}
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
