import { Tab, Tabs } from "@heroui/react";
import React, { useState } from "react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const {
        dataCategory,
        handleUpdateCategoryInfo,
        isPendingMutateUpdateCategoryInfo,
        isSuccessMutateUpdateCategoryInfo,
    } = useDetailCategory();

    const disabledTabs = hasUnsavedChanges ? ["info"] : [];

    return (
        <Tabs aria-label="Options" disabledKeys={disabledTabs}>
            <Tab key="icon" title="Icon">
                <IconTab
                    currentIcon={dataCategory?.icon}
                    onUpdate={handleUpdateCategoryInfo}
                    isPendingUpdate={isPendingMutateUpdateCategoryInfo}
                    isSuccessUpdate={isSuccessMutateUpdateCategoryInfo}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataCategory={dataCategory}
                    onUpdate={handleUpdateCategoryInfo}
                    isPendingUpdate={isPendingMutateUpdateCategoryInfo}
                    isSuccessUpdate={isSuccessMutateUpdateCategoryInfo}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailCategory;
