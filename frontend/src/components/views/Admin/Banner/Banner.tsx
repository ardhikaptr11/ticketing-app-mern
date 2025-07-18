import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import { useBanner } from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";
import DropdownAction from "@/components/commons/DropdownAction";

const Banner = () => {
    const { push, query } = useRouter();
    const {
        dataBanners,
        isLoadingBanners,
        isRefetchingBanners,
        refetchBanners,
        selectedId,
        setSelectedId,
        selectedImage,
        setSelectedImage,
    } = useBanner();

    const addBannerModal = useDisclosure();
    const deleteBannerModal = useDisclosure();

    const renderCell = useCallback(
        (banner: Record<string, unknown>, columnKey: Key) => {
            const cellValue = banner[columnKey as keyof typeof banner];

            switch (columnKey) {
                case "image":
                    return (
                        <Image
                            src={cellValue as string}
                            alt="Banner image"
                            width={200}
                            height={100}
                        />
                    );
                case "isShow":
                    return (
                        <Chip
                            color={cellValue === true ? "success" : "warning"}
                            size="sm"
                            variant="flat"
                        >
                            {cellValue === true ? "Showing" : "Not Showing"}
                        </Chip>
                    );
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() =>
                                push(`/admin/banner/${banner._id}`)
                            }
                            onPressButtonDelete={() => {
                                setSelectedId(`${banner._id}`);
                                setSelectedImage(`${banner.image}`);
                                deleteBannerModal.onOpen();
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
                    buttonTopContentLabel="Create Banner"
                    columns={COLUMN_LIST_BANNER}
                    data={dataBanners?.data || []}
                    emptyContent="Banner is empty"
                    isLoading={isLoadingBanners || isRefetchingBanners}
                    onClickButtonTopContent={addBannerModal.onOpen}
                    renderCell={renderCell}
                    totalPages={dataBanners?.pagination.totalPages}
                />
            )}
            <AddBannerModal
                refetchBanners={refetchBanners}
                {...addBannerModal}
            />
            <DeleteBannerModal
                refetchBanners={refetchBanners}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                {...deleteBannerModal}
            />
        </section>
    );
};

export default Banner;
