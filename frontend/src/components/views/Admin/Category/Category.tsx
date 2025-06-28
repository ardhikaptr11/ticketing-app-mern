import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { IoTrashOutline, IoInformationCircleOutline } from "react-icons/io5";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { useCategory } from "./useCategory";
import { SlOptionsVertical } from "react-icons/sl";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const Category = () => {
    const { push, query } = useRouter();
    const {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategory,
        selectedId,
        setSelectedId,
        selectedIcon,
        setSelectedIcon,
    } = useCategory();

    const addCategoryModal = useDisclosure();
    const deleteCategoryModal = useDisclosure();

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];

            switch (columnKey) {
                case "icon":
                    return (
                        <Image
                            src={cellValue as string}
                            alt="Category icon"
                            width={100}
                            height={200}
                        />
                    );
                case "actions":
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
                                    onPress={() =>
                                        push(`/admin/category/${category._id}`)
                                    }
                                    startContent={
                                        <IoInformationCircleOutline />
                                    }
                                >
                                    Detail
                                </DropdownItem>
                                <DropdownItem
                                    key="delete-category-button"
                                    className="text-red-500"
                                    startContent={<IoTrashOutline />}
                                    onPress={() => {
                                        setSelectedId(`${category._id}`);
                                        setSelectedIcon(`${category.icon}`);
                                        deleteCategoryModal.onOpen();
                                    }}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    );
                default:
                    return cellValue as ReactNode;
            }
        },
        [push],
    );

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContentLabel="Create Category"
                    columns={COLUMN_LIST_CATEGORY}
                    data={dataCategory?.data || []}
                    emptyContent="Category is empty"
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    onClickButtonTopContent={addCategoryModal.onOpen}
                    renderCell={renderCell}
                    totalPages={dataCategory?.pagination.totalPages}
                />
            )}
            <AddCategoryModal
                refetchCategory={refetchCategory}
                {...addCategoryModal}
            />
            <DeleteCategoryModal
                refetchCategory={refetchCategory}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                {...deleteCategoryModal}
            />
        </section>
    );
};

export default Category;
