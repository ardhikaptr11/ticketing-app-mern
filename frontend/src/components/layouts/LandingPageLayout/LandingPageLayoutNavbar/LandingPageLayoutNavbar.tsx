import {
    Avatar,
    Button,
    ButtonProps,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import SafeLink from "@/components/commons/SafeLink";
import { useRouter } from "next/router";
import cn from "@/utils/cn";
import { CiGrid41, CiLogout, CiSearch, CiUser } from "react-icons/ci";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { ImInsertTemplate } from "react-icons/im";
import { Fragment } from "react";

const LandingPageLayoutNavbar = () => {
    const router = useRouter();
    const session = useSession();
    const { dataProfile } = useLandingPageLayoutNavbar();

    return (
        <Navbar
            maxWidth="full"
            className="max-w-screen-3xl 3xl:container"
            isBordered
            isBlurred={false}
            shouldHideOnScroll
        >
            <div className="flex items-center gap-8">
                <NavbarBrand as={SafeLink} href="/">
                    <Image
                        src="/images/general/zentix.svg"
                        alt="Zentix logo"
                        width={75}
                        height={50}
                        className="cursor-pointer"
                        priority
                    />
                </NavbarBrand>
                <NavbarContent className="hidden lg:flex">
                    {NAV_ITEMS.map((item) => (
                        <NavbarItem
                            key={`nav-${item.label}`}
                            as={SafeLink}
                            href={item.href}
                            className={cn(
                                "font-medium text-default-700 hover:text-danger",
                                {
                                    "font-bold text-danger-500":
                                        router.pathname === item.href,
                                },
                            )}
                        >
                            {item.label}
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </div>
            <NavbarContent justify="end">
                <NavbarMenuToggle className="lg:hidden" />
                <NavbarItem className="hidden lg:relative lg:flex">
                    <Input
                        className="w-[300px]"
                        placeholder="Search event"
                        startContent={<CiSearch />}
                        onClear={() => {}}
                        onChange={() => {}}
                        isClearable
                    />
                </NavbarItem>

                {session.status === "authenticated" ? (
                    <NavbarItem className="hidden lg:block">
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    showFallback
                                    className="cursor-pointer"
                                    src={dataProfile?.profilePicture}
                                />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="dashboard"
                                    href="/admin/dashboard"
                                    className={cn({
                                        hidden: dataProfile?.role !== "admin",
                                    })}
                                    startContent={
                                        <CiGrid41 className="h-4 w-4" />
                                    }
                                >
                                    Dashboard
                                </DropdownItem>
                                <DropdownItem
                                    key="profile"
                                    href="/member/profile"
                                    className={cn({
                                        hidden: dataProfile?.role !== "user",
                                    })}
                                    startContent={
                                        <CiUser className="h-4 w-4" />
                                    }
                                >
                                    Profile
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    onPress={() => signOut()}
                                    startContent={
                                        <CiLogout className="h-4 w-4 text-danger" />
                                    }
                                    classNames={{ title: "text-danger" }}
                                >
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : (
                    <div className="hidden lg:flex lg:gap-4">
                        {BUTTON_ITEMS.map((item) => (
                            <NavbarItem key={`button-${item.label}`}>
                                <Button
                                    as={Link}
                                    href={item.href}
                                    variant={
                                        item.variant as ButtonProps["variant"]
                                    }
                                    color="danger"
                                >
                                    {item.label}
                                </Button>
                            </NavbarItem>
                        ))}
                    </div>
                )}

                <NavbarMenu className="gap-4">
                    {NAV_ITEMS.map((item) => (
                        <NavbarMenuItem
                            key={`nav-${item.label}`}
                            className={cn(
                                "font-medium text-default-700 hover:text-danger",
                                {
                                    "font-bold text-danger-500":
                                        router.pathname === item.href,
                                },
                            )}
                        >
                            <Link href={item.href}>{item.label}</Link>
                        </NavbarMenuItem>
                    ))}
                    {session.status === "authenticated" ? (
                        <Fragment>
                            <NavbarMenuItem
                                className={cn(
                                    "font-medium text-default-700 hover:text-danger",
                                    {
                                        hidden: dataProfile?.role !== "admin",
                                    },
                                )}
                            >
                                <Link href="/admin/dashboard">Dashboard</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem
                                className={cn(
                                    "font-medium text-default-700 hover:text-danger",
                                    {
                                        hidden: dataProfile?.role !== "user",
                                    },
                                )}
                            >
                                <Link href="/member/profile">Profile</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Button
                                    fullWidth
                                    className="flex items-center justify-center"
                                    color="danger"
                                    variant="bordered"
                                    size="md"
                                    onPress={() => signOut()}
                                >
                                    <CiLogout className="h-5 w-5" />
                                    Logout
                                </Button>
                            </NavbarMenuItem>
                        </Fragment>
                    ) : (
                        <NavbarMenuItem className="flex flex-col gap-4">
                            {BUTTON_ITEMS.map((item) => (
                                <Button
                                    fullWidth
                                    as={SafeLink}
                                    href={item.href}
                                    key={`button-${item.label}`}
                                    color="danger"
                                    variant={
                                        item.variant as ButtonProps["variant"]
                                    }
                                    size="md"
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </NavbarMenuItem>
                    )}
                </NavbarMenu>
            </NavbarContent>
        </Navbar>
    );
};

export default LandingPageLayoutNavbar;
