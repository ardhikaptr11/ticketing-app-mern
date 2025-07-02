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
    startDate?: string;
    endDate?: string;
    isPublished?: boolean | string;
    isFeatured?: boolean | string;
    isOnline?: boolean | string;
    description?: string;
    location?: {
        region: string;
        coordinates: number[];
    };
    banner?: FileList | string;
}

interface IEventForm extends IEvent {
    isOnline?: string;
    region?: string;
    startDate?: DateValue | string;
    endDate?: DateValue | string;
    latitude?: string;
    longitude?: string;
}

export type { IRegency, IEvent, IEventForm };
