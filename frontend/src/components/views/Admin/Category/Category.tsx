import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { IoTrashOutline, IoInformationCircleOutline } from "react-icons/io5";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { useCategory } from "./useCategory";
import { SlOptionsVertical } from "react-icons/sl";
import InputFile from "@/components/ui/InputFile";

const Category = () => {
    const { push, isReady, query } = useRouter();
    const {
        currentPage,
        currentLimit,
        dataCategory,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
        isLoadingCategory,
        isRefetchingCategory,
        setURL,
    } = useCategory();

    useEffect(() => {
        if (isReady) {
            setURL();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];

            switch (columnKey) {
                // case "icon":
                //     return (
                //         <Image
                //             src={cellValue as string}
                //             alt="Category Icon"
                //             width={100}
                //             height={200}
                //         />
                //     );
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
                    currentPage={Number(currentPage)}
                    data={dataCategory?.data || []}
                    emptyContent="Category is empty"
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    limit={String(currentLimit)}
                    onClickButtonTopContent={() => {}}
                    onClearSearch={handleClearSearch}
                    onPageChange={handleChangePage}
                    onSearchChange={handleSearch}
                    onLimitChange={handleChangeLimit}
                    renderCell={renderCell}
                    totalPages={dataCategory?.pagination.totalPages}
                />
            )}
            <InputFile name="input" isDropable/>
        </section>
    );
};

export default Category;
