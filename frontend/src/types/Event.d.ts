import { DateValue } from "@heroui/react";

interface IRegency {
    id: string;
    name: string;
}

interface IEvent {
    _id?: string;
    name?: string;
    slug?: string;
    category?: string;
    startDate?: string | DateValue;
    endDate?: string | DateValue;
    isPublished?: boolean | string;
    isFeatured?: boolean | string;
    isOnline?: boolean | string;
    description?: string;
    location?: {
        region: string;
        coordinates: number[];
        address: string;
    };
    banner?: FileList | string;
}

interface IEventForm extends IEvent {
    isOnline?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
    address?: string;
}

export type { IRegency, IEvent, IEventForm };
