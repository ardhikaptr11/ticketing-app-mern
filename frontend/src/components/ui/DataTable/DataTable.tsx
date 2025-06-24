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
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { cn } from "../../../utils/cn";

interface PropTypes {
    buttonTopContentLabel?: string;
    columns: Record<string, unknown>[];
    currentPage: number;
    data: Record<string, unknown>[];
    emptyContent: string;
    isLoading?: boolean;
    limit: string;
    onClearSearch: () => void;
    onClickButtonTopContent?: () => void;
    onPageChange: (page: number) => void;
    onLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
    totalPages: number;
}

const DataTable = (props: PropTypes) => {
    const {
        buttonTopContentLabel,
        columns,
        currentPage,
        data,
        emptyContent,
        isLoading,
        limit,
        onClearSearch,
        onClickButtonTopContent,
        onPageChange,
        onLimitChange,
        onSearchChange,
        renderCell,
        totalPages,
    } = props;

    const TopContent = useMemo(
        () => (
            <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <Input
                    isClearable
                    className="w-full sm:max-w-[24%]"
                    placeholder="Search by name"
                    startContent={<CiSearch />}
                    onChange={onSearchChange}
                    onClear={onClearSearch}
                />
                {buttonTopContentLabel && (
                    <Button color="danger" onPress={onClickButtonTopContent}>
                        {buttonTopContentLabel}
                    </Button>
                )}
            </div>
        ),
        [
            buttonTopContentLabel,
            onClearSearch,
            onSearchChange,
            onClickButtonTopContent,
        ],
    );

    const BottomContent = useMemo(
        () => (
            <div className="flex items-center justify-center lg:justify-between">
                <Select
                    className="hidden max-w-36 lg:block"
                    size="md"
                    selectedKeys={[limit]}
                    selectionMode="single"
                    onChange={onLimitChange}
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
                        page={currentPage}
                        total={totalPages}
                        onChange={onPageChange}
                        loop
                    />
                )}
            </div>
        ),
        [limit, currentPage, totalPages, onPageChange, onLimitChange],
    );

    return (
        <Table
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
