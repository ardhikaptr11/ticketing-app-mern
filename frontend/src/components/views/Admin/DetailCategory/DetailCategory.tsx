import { Tab, Tabs } from "@heroui/react";
import React from "react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
    const {
        dataCategory,
        handleUpdateCategoryInfo,
        isPendingMutateUpdateCategoryInfo,
        isSuccessMutateUpdateCategoryInfo,
    } = useDetailCategory();

    return (
        <Tabs aria-label="Options">
            <Tab key="icon" title="Icon">
                <IconTab
                    currentIcon={dataCategory?.icon}
                    onUpdate={handleUpdateCategoryInfo}
                    isPendingUpdate={isPendingMutateUpdateCategoryInfo}
                    isSuccessUpdate={isSuccessMutateUpdateCategoryInfo}
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
