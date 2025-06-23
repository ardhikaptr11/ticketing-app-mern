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
import React, { Key, ReactNode, useCallback } from "react";
import { CiCircleInfo, CiMenuKebab, CiTrash } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LISTS } from "@/constants/list.contants";

const Category = () => {
    const { push } = useRouter();

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];

            switch (columnKey) {
                case "icon":
                    return (
                        <Image
                            src={cellValue as string}
                            alt="Category Icon"
                            width={100}
                            height={200}
                        />
                    );
                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <CiMenuKebab className="text-defualt-700" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="detail-category-button"
                                    onPress={() =>
                                        push(`/admin/category/${category._id}`)
                                    }
                                    startContent={<CiCircleInfo />}
                                >
                                    Detail
                                </DropdownItem>
                                <DropdownItem
                                    key="delete-category-button"
                                    className="text-red-500"
                                    startContent={<CiTrash />}
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
            <DataTable
                buttonTopContentLabel="Create Category"
                columns={COLUMN_LIST_CATEGORY}
                currentPage={1}
                data={[
                    {
                        _id: "1",
                        name: "Category 1",
                        description: "This is a description for Category 1",
                        icon: "/images/general/zentix.png",
                    },
                    {
                        _id: "2",
                        name: "Category 2",
                        description: "This is a description for Category 2",
                        icon: "/images/general/zentix.png",
                    },
                ]}
                emptyContent="Category is empty"
                limit={LIMIT_LISTS[0].label}
                onClickButtonTopContent={() => {}}
                onClearSearch={() => {}}
                onPageChange={() => {}}
                onSearchChange={() => {}}
                onLimitChange={() => {}}
                renderCell={renderCell}
                totalPages={2}
            />
        </section>
    );
};

export default Category;
