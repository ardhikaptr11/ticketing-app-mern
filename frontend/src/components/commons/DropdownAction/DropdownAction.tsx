import {
    Button,
    cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import { ReactNode } from "react";
import { IoInformationCircleOutline, IoTrashOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";

export type TActionList = {
    name: string;
    startContent: ReactNode;
    action: () => void;
};

interface PropTypes {
    listOfActions: TActionList[];
}

const DropdownAction = (props: PropTypes) => {
    const { listOfActions } = props;

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <SlOptionsVertical className="text-default-700" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                {listOfActions.map((loa) => (
                    <DropdownItem
                        key={`${loa.name}-button`}
                        onPress={loa.action}
                        startContent={loa.startContent}
                        className={cn("capitalize gap-1", {
                            "text-danger":
                                loa.name === "delete" || loa.name === "cancel",
                        })}
                    >
                        {loa.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownAction;
