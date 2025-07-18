import { LIMIT_LISTS } from "@/constants/list.constants";
import {
    Button,
    Input,
    Pagination,
    Select,
    SelectItem,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { cn } from "../../../utils/cn";
import useChangeURL from "@/hooks/useChangeURL";

interface PropTypes {
    buttonTopContentLabel?: string;
    columns: Record<string, unknown>[];
    data: Record<string, unknown>[];
    emptyContent: string;
    isLoading?: boolean;
    onClickButtonTopContent?: () => void;
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
    showSearch?: boolean;
    showLimit?: boolean;
    totalPages: number;
    disableChangeURL?: boolean;
}

const DataTable = (props: PropTypes) => {
    const {
        buttonTopContentLabel,
        columns,
        data,
        emptyContent,
        isLoading,
        onClickButtonTopContent,
        renderCell,
        totalPages,
        showSearch = true,
        showLimit = true,
        disableChangeURL = false,
    } = props;

    const {
        currentLimit,
        currentPage,
        handleClearSearch,
        handleChangePage,
        handleSearch,
        handleChangeLimit,
    } = useChangeURL(disableChangeURL);

    const TopContent = useMemo(
        () => (
            <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                {showSearch && (
                    <Input
                        isClearable
                        className="w-full sm:max-w-[24%]"
                        placeholder="Search by name"
                        startContent={<CiSearch />}
                        onChange={handleSearch}
                        onClear={handleClearSearch}
                    />
                )}
                {buttonTopContentLabel && (
                    <Button color="danger" onPress={onClickButtonTopContent}>
                        {buttonTopContentLabel}
                    </Button>
                )}
            </div>
        ),
        [
            buttonTopContentLabel,
            handleClearSearch,
            handleSearch,
            onClickButtonTopContent,
        ],
    );

    const BottomContent = useMemo(
        () => (
            <div className="flex items-center justify-center lg:justify-between">
                {showLimit && (
                    <Select
                        aria-label="Rows per page"
                        className="hidden max-w-36 lg:block"
                        size="md"
                        selectedKeys={[`${currentLimit}`]}
                        selectionMode="single"
                        onChange={handleChangeLimit}
                        startContent={<p className="text-small">Show:</p>}
                        disallowEmptySelection
                    >
                        {LIMIT_LISTS.map((item) => (
                            <SelectItem key={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                )}
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
        ),
        [
            currentLimit,
            currentPage,
            totalPages,
            handleChangePage,
            handleChangeLimit,
        ],
    );

    return (
        <Table
            aria-label="Category list table"
            bottomContent={BottomContent}
            bottomContentPlacement="outside"
            classNames={{
                base: "max-w-full",
                wrapper: cn({ "overflow-x-hidden z-50": isLoading }),
            }}
            topContent={TopContent}
            topContentPlacement="outside"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as Key}>
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={data}
                emptyContent={emptyContent}
                isLoading={isLoading}
                loadingContent={
                    <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
                        <Spinner
                            color="danger"
                            label="Loading"
                            variant="wave"
                            classNames={{ label: "text-default-500" }}
                        />
                    </div>
                }
            >
                {(item) => (
                    <TableRow key={item._id as Key}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DataTable;
