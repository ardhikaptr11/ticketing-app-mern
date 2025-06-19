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
        href: "/admin",
        icon: <CiGrid41 />,
    },
    {
        key: "event",
        label: "Event",
        href: "/admin/event",
        icon: <CiViewList />,
    },
    {
        key: "category",
        label: "Category",
        href: "/admin/category",
        icon: <CiShoppingTag />,
    },
    {
        key: "banner",
        label: "Banner",
        href: "/admin/banner",
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
        label: "Transaction",
        href: "/member/transaction",
        icon: <CiWallet />,
    },
    {
        key: "profile",
        label: "Profile",
        href: "/member",
        icon: <CiUser />,
    },
];
