import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import { IoInformationCircleOutline, IoTrashOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";

interface PropTypes {
    actionType?: string;
    onPressButtonDetail?: () => void;
    onPressButtonDelete: () => void;
    onPressButtonUpdate?: () => void;
}

const DropdownAction = (props: PropTypes) => {
    const {
        onPressButtonDetail,
        onPressButtonDelete,
        onPressButtonUpdate,
        actionType = "detail",
    } = props;

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <SlOptionsVertical className="text-default-700" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                {actionType === "detail" ? (
                    <DropdownItem
                        key="detail-button"
                        onPress={onPressButtonDetail}
                        startContent={<IoInformationCircleOutline />}
                    >
                        Detail
                    </DropdownItem>
                ) : (
                    <DropdownItem
                        key="update-button"
                        onPress={onPressButtonUpdate}
                        startContent={<LuPencilLine />}
                    >
                        Update
                    </DropdownItem>
                )}
                <DropdownItem
                    key="delete-button"
                    className="text-red-500"
                    startContent={<IoTrashOutline />}
                    onPress={onPressButtonDelete}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownAction;
