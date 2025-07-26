import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeURL from "@/hooks/useChangeURL";
import { Pagination, Select, SelectItem } from "@heroui/react";

interface PropTypes {
    totalPages: number;
}

const EventFooter = (props: PropTypes) => {
    const {  totalPages } = props;
    const { currentLimit, handleChangeLimit, handleChangePage, currentPage } =
        useChangeURL();

    return (
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
            <Select
                aria-label="Rows per page"
                className="max-w-28"
                size="md"
                selectedKeys={[`${currentLimit}`]}
                selectionMode="single"
                onChange={handleChangeLimit}
                startContent={<p className="text-small">Show:</p>}
                disallowEmptySelection
            >
                {LIMIT_LISTS.map((item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                ))}
            </Select>
            {totalPages > 1 && (
                <Pagination
                    isCompact
                    showControls
                    color="danger"
                    page={Number(currentPage)}
                    total={totalPages}
                    onChange={handleChangePage}
                    loop
                />
            )}
        </div>
    );
};

export default EventFooter;
