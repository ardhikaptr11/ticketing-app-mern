import {
    Avatar,
    Button,
    ButtonProps,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Input,
    Listbox,
    ListboxItem,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Skeleton,
    User,
} from "@heroui/react";
import Image from "next/image";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import SafeLink from "@/components/commons/SafeLink";
import { useRouter } from "next/router";
import cn from "@/utils/cn";
import { CiGrid41, CiLogout, CiSearch, CiWallet } from "react-icons/ci";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import { IEvent } from "@/types/Event";
import { displayEventDateTime } from "@/utils/date";
import { FaArrowRight } from "react-icons/fa6";

const LandingPageLayoutNavbar = () => {
    const router = useRouter();
    const { status } = useSession();

    const {
        dataProfile,
        dataSearchEvents,
        handleClearSearch,
        handleSearchEvent,
        isRefetchingSearchEvents,
        isLoadingSearchEvents,
        searchEvent,
    } = useLandingPageLayoutNavbar();

    return (
        <Navbar
            maxWidth="full"
            isBordered
            isBlurred={false}
            className="p-4"
            classNames={{ wrapper: "p-0" }}
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
                                        item.label === "Explore"
                                            ? router.asPath.startsWith(
                                                  "/events",
                                              )
                                            : router.pathname === "/",
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
                <div className="relative">
                    <NavbarItem className="hidden lg:relative lg:flex">
                        <Input
                            className="w-[300px]"
                            placeholder="Search event"
                            startContent={<CiSearch />}
                            onClear={handleClearSearch}
                            onChange={(e) => handleSearchEvent(e.target.value)}
                            isClearable
                        />
                    </NavbarItem>
                    {searchEvent !== "" && (
                        <Listbox
                            aria-label="Event found box"
                            className="fixed top-20 max-w-[300px] rounded-lg bg-white"
                            itemClasses={{
                                base: "gap-4 data-[hover=true]:bg-default-100/80",
                            }}
                            emptyContent="Sorry, no one has created that event."
                        >
                            {isLoadingSearchEvents ||
                            isRefetchingSearchEvents ? (
                                <ListboxItem
                                    key="skeleton-search-event"
                                    startContent={
                                        <Skeleton className="h-16 w-20 rounded-md" />
                                    }
                                >
                                    <div className="flex flex-col justify-center gap-2">
                                        <Skeleton className="h-3 w-4/5 rounded-2xl" />
                                        <Skeleton className="h-3 w-3/5 rounded-2xl" />
                                    </div>
                                </ListboxItem>
                            ) : (
                                dataSearchEvents?.map((data: IEvent) => (
                                    <ListboxItem
                                        key={data._id}
                                        startContent={
                                            <Image
                                                src={`${data.banner}`}
                                                alt={`${data.name}`}
                                                width={80}
                                                height={40}
                                                className="rounded-md"
                                            />
                                        }
                                        endContent={<FaArrowRight />}
                                        href={`/event/${data.slug}`}
                                    >
                                        <div className="flex flex-col justify-center">
                                            <h3 className="line-clamp-1">
                                                {data.name}
                                            </h3>
                                            <p className="text-default-400">
                                                {
                                                    displayEventDateTime(
                                                        `${data.startDate}`,
                                                        `${data.endDate}`,
                                                    ).split(",")[0]
                                                }
                                            </p>
                                        </div>
                                    </ListboxItem>
                                ))
                            )}
                        </Listbox>
                    )}
                </div>

                {status === "authenticated" ? (
                    <NavbarItem className="hidden lg:flex">
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    showFallback
                                    as="button"
                                    className="transition-transform"
                                    src={dataProfile?.profilePicture}
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                            >
                                <DropdownSection
                                    showDivider
                                    aria-label="Profile"
                                >
                                    <DropdownItem
                                        key="profile"
                                        isReadOnly={
                                            dataProfile?.role === "admin"
                                                ? true
                                                : false
                                        }
                                        className="h-14 gap-2 opacity-100"
                                        href={
                                            dataProfile?.role === "user"
                                                ? "/member/profile"
                                                : undefined
                                        }
                                    >
                                        <User
                                            avatarProps={{
                                                size: "sm",
                                                src: dataProfile?.profilePicture,
                                                showFallback: true,
                                            }}
                                            classNames={{
                                                name: "text-default-600",
                                                description: "text-default-500",
                                            }}
                                            name={dataProfile?.fullName}
                                            description={
                                                <p>
                                                    @{dataProfile?.username}{" "}
                                                    <span
                                                        className={cn({
                                                            hidden:
                                                                dataProfile?.role !==
                                                                "admin",
                                                        })}
                                                    >
                                                        ({dataProfile?.role})
                                                    </span>
                                                </p>
                                            }
                                        />
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownItem
                                    key="dashboard"
                                    href="/admin/dashboard"
                                    className={cn({
                                        hidden: dataProfile?.role !== "admin",
                                    })}
                                    startContent={
                                        <CiGrid41 className="text-xl" />
                                    }
                                >
                                    Dashboard
                                </DropdownItem>
                                <DropdownItem
                                    key="transactions"
                                    href="/member/transactions"
                                    className={cn({
                                        hidden: dataProfile?.role !== "user",
                                    })}
                                    startContent={
                                        <CiWallet className="text-xl" />
                                    }
                                >
                                    Transactions
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
                                    as={SafeLink}
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
                    {status === "authenticated" ? (
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
