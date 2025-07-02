import { DateValue } from "@heroui/react";
import {
    getLocalTimeZone,
    now,
    parseAbsoluteToLocal,
    ZonedDateTime,
} from "@internationalized/date";

const currentDate = now(getLocalTimeZone());

const standardizedTime = (time: number) => time.toString().padStart(2, "0");

const standardizeDate = (date: DateValue) => {
    const year = date.year;
    const month = date.month < 10 ? `0${date.month}` : date.month;
    const day = date.day < 10 ? `0${date.day}` : date.day;

    const hour = "hour" in date ? date.hour : 0;
    const minute = "minute" in date ? date.minute : 0;
    const second = 0;

    const result = `${year}-${month}-${day} ${standardizedTime(hour)}:${standardizedTime(minute)}:${standardizedTime(second)}`;

    return result;
};

const formatDate = (date: string) => {
    const formattedDate = parseAbsoluteToLocal(
        `${date.replace(" ", "T")}+07:00`,
    );

    return formattedDate;
};

export { standardizeDate, formatDate, currentDate };
