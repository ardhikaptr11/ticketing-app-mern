import { DateValue } from "@heroui/react";
import {
    getLocalTimeZone,
    now,
    parseZonedDateTime,
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

const displaySingleDateTime = (dateString: string) => {
    const dateObject = new Date(dateString);

    const date = dateObject.toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
    });

    return `${date.replace(" pukul", ",")} WIB`;
};

const displayEventDateTime = (
    startDateString: string,
    endDateString: string,
) => {
    const monthMap: Record<string, string> = {
        "1": "Januari",
        "2": "Februari",
        "3": "Maret",
        "4": "April",
        "5": "Mei",
        "6": "Juni",
        "7": "Juli",
        "8": "Agustus",
        "9": "September",
        "10": "Oktober",
        "11": "November",
        "12": "Desember",
    };

    const startDateObject = new Date(startDateString);
    const endDateObject = new Date(endDateString);

    const isSameDatetime =
        startDateObject.getDate() === endDateObject.getDate() &&
        startDateObject.getMonth() === endDateObject.getMonth() &&
        startDateObject.getFullYear() === endDateObject.getFullYear();

    const isEndAtMidnight =
        endDateObject.getHours() === 23 && endDateObject.getMinutes() === 59;

    const startHours =
        startDateObject.getHours() < 10
            ? `0${startDateObject.getHours()}`
            : startDateObject.getHours();

    const endHours =
        endDateObject.getHours() < 10
            ? `0${endDateObject.getHours()}`
            : endDateObject.getHours();

    const startMinutes =
        startDateObject.getMinutes() < 10
            ? `0${startDateObject.getMinutes()}`
            : startDateObject.getMinutes();

    const endMinutes =
        endDateObject.getMinutes() < 10
            ? `0${endDateObject.getMinutes()}`
            : endDateObject.getMinutes();

    return isEndAtMidnight
        ? isSameDatetime
            ? `${startDateObject.getDate()} ${monthMap[String(endDateObject.getMonth() + 1)]} ${startDateObject.getFullYear()}, ${startHours}.${startMinutes} WIB - selesai`
            : `${startDateObject.getDate()} - ${endDateObject.getDate()} ${monthMap[String(endDateObject.getMonth() + 1)]} ${startDateObject.getFullYear()}, ${startHours}.${startMinutes} WIB - selesai`
        : isSameDatetime
            ? `${startDateObject.getDate()} ${monthMap[String(endDateObject.getMonth() + 1)]} ${startDateObject.getFullYear()}, ${startHours}.${startMinutes} - ${endHours}.${endMinutes} WIB`
            : `${startDateObject.getDate()} - ${endDateObject.getDate()} ${monthMap[String(endDateObject.getMonth() + 1)]} ${startDateObject.getFullYear()}, ${startHours}.${startMinutes} - ${startHours}.${startMinutes} WIB`;
};

export {
    currentDate,
    displaySingleDateTime,
    displayEventDateTime,
    formatDate,
    standardizeDate,
};
