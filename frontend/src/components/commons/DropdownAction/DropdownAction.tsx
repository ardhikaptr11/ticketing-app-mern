import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useRouter } from "next/router";
import { IoInformationCircleOutline, IoTrashOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";


interface PropTypes {
    onPressButtonDetail: () => void;
    onPressButtonDelete: () => void;
}


const DropdownAction = (props: PropTypes) => {
    const { onPressButtonDetail, onPressButtonDelete } = props;

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <SlOptionsVertical className="text-defualt-700" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem
                    key="detail-category-button"
                    onPress={onPressButtonDetail}
                    startContent={<IoInformationCircleOutline />}
                >
                    Detail
                </DropdownItem>
                <DropdownItem
                    key="delete-event-button"
                    className="text-red-500"
                    startContent={<IoTrashOutline />}
                    onPress={onPressButtonDelete}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default DropdownAction
