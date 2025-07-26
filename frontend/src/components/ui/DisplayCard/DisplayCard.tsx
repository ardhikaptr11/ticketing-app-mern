import SafeLink from "@/components/commons/SafeLink";
import { ICategory } from "@/types/Category";
import { IEvent } from "@/types/Event";
import cn from "@/utils/cn";
import { displayEventDateTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Image from "next/image";
import { Fragment } from "react";

interface PropTypes {
    type: "event" | "category";
    data?: IEvent | ICategory;
    className?: string;
    isLoading?: boolean;
}

const DisplayCard = (props: PropTypes) => {
    const { type, data, className, isLoading } = props;

    return (
        <Card
            className={cn(className, "cursor-pointer hover:scale-95")}
            shadow="sm"
            as={SafeLink}
            href={
                type === "event"
                    ? `/event/${(data as IEvent)?.slug}`
                    : `/events?category=${(data as ICategory)?._id}`
            }
        >
            {!isLoading ? (
                <Fragment>
                    <CardBody className="items-center">
                        <Image
                            src={
                                type === "event"
                                    ? `${(data as IEvent)?.banner}`
                                    : `${(data as ICategory)?.icon}`
                            }
                            alt="Event banner"
                            className={cn(
                                "rounded-lg",
                                type === "event"
                                    ? "aspect-video w-full"
                                    : "1/2 aspect-square",
                            )}
                            {...(type === "event"
                                ? { width: 1920, height: 800 }
                                : { width: 100, height: 100 })}
                        />
                    </CardBody>
                    <CardFooter
                        className={cn(
                            "pt-0",
                            type === "event"
                                ? "flex-col items-start text-left"
                                : "justify-center",
                        )}
                    >
                        {type === "event" ? (
                            <h2 className="line-clamp-1 text-lg font-bold text-danger">
                                {data?.name}
                            </h2>
                        ) : (
                            <p className="text-md font-bold">{data?.name}</p>
                        )}
                        <p
                            className={cn("mb-2 line-clamp-2", {
                                hidden: type === "category",
                            })}
                        >
                            {data?.description}
                        </p>
                        <p
                            className={cn("text-sm text-foreground-500", {
                                hidden: type === "category",
                            })}
                        >
                            {displayEventDateTime(
                                `${(data as IEvent)?.startDate}`,
                                `${(data as IEvent)?.endDate}`,
                            )}
                        </p>
                    </CardFooter>
                </Fragment>
            ) : (
                <Fragment>
                    <CardBody>
                        <Skeleton
                            className={cn(
                                "w-full rounded-lg bg-default-300",
                                type === "event"
                                    ? "aspect-video"
                                    : "aspect-square",
                            )}
                        />
                    </CardBody>
                    <CardFooter
                        className={cn(
                            "pt-0",
                            type === "event"
                                ? "flex-col items-start gap-2"
                                : "justify-center",
                        )}
                    >
                        <Skeleton className="h-4 w-3/5 rounded-lg bg-default-200" />
                        <Skeleton
                            className={cn(
                                "h-4 w-4/5 rounded-lg bg-default-200",
                                {
                                    hidden: type === "category",
                                },
                            )}
                        />
                        <Skeleton
                            className={cn(
                                "h-4 w-2/5 rounded-lg bg-default-200",
                                {
                                    hidden: type === "category",
                                },
                            )}
                        />
                    </CardFooter>
                </Fragment>
            )}
        </Card>
    );
};

export default DisplayCard;
