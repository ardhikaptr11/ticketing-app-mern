import {
    CiBookmark,
    CiGrid41,
    CiSettings,
    CiShoppingTag,
    CiUser,
    CiViewList,
    CiWallet,
} from "react-icons/ci";

export const SIDEBAR_ADMIN = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <CiGrid41 />,
    },
    {
        key: "event",
        label: "Event",
        href: "/admin/event?limit=5&page=1&search=",
        icon: <CiViewList />,
    },
    {
        key: "category",
        label: "Category",
        href: "/admin/category?limit=5&page=1&search=",
        icon: <CiShoppingTag />,
    },
    {
        key: "banner",
        label: "Banner",
        href: "/admin/banner?limit=5&page=1&search=",
        icon: <CiBookmark />,
    },
    {
        key: "transaction",
        label: "Transaction",
        href: "/admin/transaction",
        icon: <CiWallet />,
    },
];

export const SIDEBAR_MEMBER = [
    {
        key: "transaction",
        label: "Transactions",
        href: "/member/transactions",
        icon: <CiWallet />,
    },
    {
        key: "profile",
        label: "Profile",
        href: "/member",
        icon: <CiUser />,
    },
];
