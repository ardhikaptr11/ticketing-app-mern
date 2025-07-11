import { DateValue } from "@heroui/react";
import {
    getLocalTimeZone,
    now,
    parseAbsoluteToLocal,
    parseZonedDateTime,
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
    const formattedDate = parseZonedDateTime(
        `${date.replace(" ", "T")}[Asia/Jakarta]`,
    );

    return formattedDate;
};

const displayDate = (dateString: string) => {
    const date = formatDate(dateString).toDate();

    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Jakarta",
    });

    const displayedDate = formatter.format(date);
    return `${displayedDate.replace(" pukul", ",")} WIB`;
};

export { currentDate, displayDate, formatDate, standardizeDate };
