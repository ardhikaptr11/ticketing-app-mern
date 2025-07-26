const LIMIT_LISTS = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
];
const ALLOWED_LIMITS = LIMIT_LISTS.map((item) => item.label);
const LIMIT_DEFAULT = LIMIT_LISTS[0].value;
const PAGE_DEFAULT = 1;
const DELAY = 1000;

const LIMIT_BANNERS = 5;
const LIMIT_CATEGORIES = 10;

export {
    LIMIT_LISTS,
    ALLOWED_LIMITS,
    LIMIT_DEFAULT,
    PAGE_DEFAULT,
    DELAY,
    LIMIT_BANNERS,
    LIMIT_CATEGORIES,
};
