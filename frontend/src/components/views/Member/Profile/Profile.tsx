import { useState } from "react";
import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useProfile from "./useProfile";
import PictureTab from "./PictureTab";
import SecurityTab from "./SecurityTab";

const DetailEvent = () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const {
        dataUserProfile,
        handleUpdateUser,
        handleUpdateUserInfo,
        handleUpdateUserPassword,
        isPendingMutateUpdateUserInfo,
        isPendingMutateUpdateUserPassword,
        isSuccessMutateUpdateUserInfo,
        isSuccessMutateUpdateUserPassword,
    } = useProfile();

    const disabledTabs = hasUnsavedChanges ? ["info", "security"] : [];

    return (
        <Tabs aria-label="Options" disabledKeys={disabledTabs}>
            <Tab key="picture" title="Picture">
                <PictureTab
                    currentPicture={dataUserProfile?.profilePicture}
                    onUpdate={handleUpdateUser}
                    isPendingUpdate={isPendingMutateUpdateUserInfo}
                    isSuccessUpdate={isSuccessMutateUpdateUserInfo}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataProfile={dataUserProfile}
                    onUpdate={handleUpdateUserInfo}
                    isPendingUpdate={isPendingMutateUpdateUserInfo}
                    isSuccessUpdate={isSuccessMutateUpdateUserInfo}
                />
            </Tab>
            <Tab key="security" title="Security">
                <SecurityTab
                    onUpdate={handleUpdateUserPassword}
                    isPendingUpdate={isPendingMutateUpdateUserPassword}
                    isSuccessUpdate={isSuccessMutateUpdateUserPassword}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailEvent;
