import {
    FaFacebook,
    FaInstagram,
    FaTiktok,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

export const NAV_ITEMS = [
    { label: "Home", href: "/" },
    {
        label: "Explore",
        href: "/events?limit=5&page=1&category=&isOnline=&isFeatured=",
    },
];

export const BUTTON_ITEMS = [
    { label: "Register", href: "/auth/register", variant: "bordered" },
    { label: "Login", href: "/auth/login", variant: "solid" },
];

export const SOCIAL_ITEMS = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/zentix",
        icon: <FaFacebook />,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/zentix",
        icon: <FaInstagram />,
    },
    {
        label: "Twitter",
        href: "https://www.x.com/zentix",
        icon: <FaXTwitter className="h-5 w-5" />,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@zentix",
        icon: <FaTiktok />,
    },
    {
        label: "Youtube",
        href: "https://www.youtube.com/@zentix",
        icon: <FaYoutube />,
    },
];
