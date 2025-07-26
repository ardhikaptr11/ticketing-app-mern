import { IBanner } from "@/types/Banner";
import { ICategory } from "@/types/Category";
import { IEvent } from "@/types/Event";

const sortEventsByCreationDate = (data: (IEvent & { createdAt: string })[]) => {
    if (!Array.isArray(data)) return [];

    return [...data].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
};

const sortCategoriesByAlphabet = (data: ICategory[]) => {
    if (!Array.isArray(data)) return [];

    return [...data].sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB);
    });
};

const sortShowingBanners = (data: IBanner[]) => {
    if (!Array.isArray(data)) return [];

    return [...data].sort((a, b) => {
        const bannerA = a.title || "";
        const bannerB = b.title || "";
        return bannerA.localeCompare(bannerB);
    });
};

export {
    sortShowingBanners,
    sortEventsByCreationDate,
    sortCategoriesByAlphabet,
};
