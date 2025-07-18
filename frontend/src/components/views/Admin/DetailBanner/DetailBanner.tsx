import { Tab, Tabs } from "@heroui/react";
import React, { useState } from "react";
import InfoTab from "./InfoTab";
import ImageTab from "./ImageTab";
import useDetailBanner from "./useDetailBanner";

const DetailBanner = () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const {
        dataBanner,
        handleUpdateBannerInfo,
        isPendingMutateUpdateBannerInfo,
        isSuccessMutateUpdateBannerInfo,
    } = useDetailBanner();

    const disabledTabs = hasUnsavedChanges ? ["info"] : [];

    return (
        <Tabs aria-label="Options" disabledKeys={disabledTabs}>
            <Tab key="icon" title="Image">
                <ImageTab
                    currentImage={dataBanner?.image}
                    onUpdate={handleUpdateBannerInfo}
                    isPendingUpdate={isPendingMutateUpdateBannerInfo}
                    isSuccessUpdate={isSuccessMutateUpdateBannerInfo}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataBanner={dataBanner}
                    onUpdate={handleUpdateBannerInfo}
                    isPendingUpdate={isPendingMutateUpdateBannerInfo}
                    isSuccessUpdate={isSuccessMutateUpdateBannerInfo}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailBanner;
