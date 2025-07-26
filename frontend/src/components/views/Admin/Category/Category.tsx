import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { useCategory } from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import DropdownAction from "@/components/commons/DropdownAction";
import {
    ALLOWED_LIMITS,
    LIMIT_DEFAULT,
    PAGE_DEFAULT,
} from "@/constants/list.constants";
import useChangeURL from "@/hooks/useChangeURL";

const Category = () => {
    const { isReady, push, query, replace } = useRouter();
    const { currentLimit, currentSearch, setUrl } = useChangeURL();

    const {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategories,
        selectedId,
        setSelectedId,
        selectedIcon,
        setSelectedIcon,
    } = useCategory();

    useEffect(() => {
        if (isReady) {
            if (!ALLOWED_LIMITS.includes(currentLimit as string)) {
                replace({
                    query: {
                        limit: LIMIT_DEFAULT,
                        page: PAGE_DEFAULT,
                        search: currentSearch || "",
                    },
                });
                return;
            }

            setUrl();
        }
    }, [isReady]);

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
                        <DropdownAction
                            onPressButtonDetail={() =>
                                push(`/admin/category/${category._id}`)
                            }
                            onPressButtonDelete={() => {
                                setSelectedId(`${category._id}`);
                                setSelectedIcon(`${category.icon}`);
                                deleteCategoryModal.onOpen();
                            }}
                        />
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
                refetchCategories={refetchCategories}
                {...addCategoryModal}
            />
            <DeleteCategoryModal
                refetchCategories={refetchCategories}
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
