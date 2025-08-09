import useDetailTransaction from "./useDetailTransaction";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Skeleton,
} from "@heroui/react";
import { convertToIDR } from "@/utils/currency";
import { FaRegCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import { displayEventDateTime } from "@/utils/date";
import SafeLink from "@/components/commons/SafeLink";

type TVoucher = {
    voucherId: string;
    isPrint: boolean;
    _id: string;
};

const DetailTransaction = () => {
    const {
        dataCategories,
        dataEvent,
        dataTickets,
        dataTransaction,
        isLoadingDataTickets,
        qrCode,
    } = useDetailTransaction();

    return (
        <Card className="px-5 py-4">
            <CardHeader className="gap-8">
                <div className="flex w-full flex-col gap-2">
                    <h4 className="font-bold">Order:</h4>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div>
                            <p className="mb-2 text-sm font-semibold">
                                Order ID:
                            </p>
                            <Skeleton
                                isLoaded={!!dataTransaction?.orderId}
                                className="h-4 rounded-md"
                            >
                                <p className="text-sm">
                                    {dataTransaction?.orderId}
                                </p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold">
                                Ticket:
                            </p>
                            <div className="flex flex-col gap-1">
                                {isLoadingDataTickets
                                    ? Array.from({ length: 2 }).map(
                                          (_, idx) => (
                                              <Skeleton
                                                  key={idx}
                                                  className="h-4 w-full rounded-md"
                                              />
                                          ),
                                      )
                                    : dataTickets?.map((ticket, index) => (
                                          <p className="text-sm" key={index}>
                                              {`${ticket?.name} (${convertToIDR(Number(ticket?.price))}) x ${Number(dataTransaction?.tickets?.[index]?.quantity)}`}
                                          </p>
                                      ))}
                            </div>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold">Total:</p>
                            <Skeleton
                                isLoaded={!!dataTransaction?.total}
                                className="h-4 rounded-md"
                            >
                                <p className="text-sm">
                                    {convertToIDR(dataTransaction?.total)}
                                </p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold">
                                Status:
                            </p>
                            <Skeleton
                                isLoaded={!!dataTransaction?.status}
                                className="h-4 rounded-md"
                            >
                                <Chip
                                    color="success"
                                    startContent={
                                        <FaRegCircleCheck width={24} />
                                    }
                                    variant="flat"
                                    className="capitalize"
                                >
                                    {dataTransaction?.status}
                                </Chip>
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex w-full flex-col gap-2">
                    <h4 className="font-bold">Ticket:</h4>
                    <div className="flex flex-col gap-4">
                        {dataTransaction?.vouchers.map(
                            (voucher: TVoucher, idx: number) => (
                                <Card
                                    className="flex flex-col gap-2 p-5 lg:flex-row"
                                    key={`ticket-${idx}`}
                                >
                                    {qrCode ? (
                                        <Image
                                            src={`${qrCode}`}
                                            width={300}
                                            height={300}
                                            alt="QR Code"
                                            className="mx-auto lg:mx-0"
                                        />
                                    ) : (
                                        <Skeleton className="mx-auto h-[300px] w-[300px] rounded-md lg:mx-0" />
                                    )}
                                    <div className="flex flex-col gap-2 p-1">
                                        <h1 className="text-xl font-semibold text-danger-500">
                                            {dataEvent?.name}
                                        </h1>
                                        <div className="text-sm font-semibold">
                                            <p className="text-foreground-500">
                                                Category
                                            </p>
                                            <p className="text-danger-500">
                                                {dataCategories[idx]}
                                            </p>
                                        </div>
                                        <div className="text-sm font-semibold">
                                            <p className="text-foreground-500">
                                                Date
                                            </p>
                                            <p className="text-danger-500">
                                                {displayEventDateTime(
                                                    `${dataEvent?.startDate}`,
                                                    `${dataEvent?.endDate}`,
                                                )}
                                            </p>
                                        </div>
                                        <div className="text-sm font-semibold">
                                            <p className="text-foreground-500">
                                                Location
                                            </p>
                                            <p className="text-danger-500">
                                                {dataEvent?.location?.address}
                                            </p>
                                        </div>
                                        <Button
                                            variant="bordered"
                                            size="md"
                                            color="danger"
                                            className="max-w-[100px]"
                                            as={SafeLink}
                                            href={
                                                dataEvent?.isOnline
                                                    ? `${dataEvent?.address}`
                                                    : `/member/transactions/${dataTransaction?.orderId}/ticket?voucher=${voucher.voucherId}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {dataEvent?.isOnline
                                                ? "Join Now"
                                                : "Show Ticket"}
                                        </Button>
                                    </div>
                                </Card>
                            ),
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default DetailTransaction;
