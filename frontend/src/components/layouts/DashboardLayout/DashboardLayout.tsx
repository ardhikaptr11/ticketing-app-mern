import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./Dashboard.constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropTypes {
    children: ReactNode;
    title: string;
    description?: string;
    type?: string;
}

const DashboardLayout = (props: PropTypes) => {
    const { children, title, description, type = "admin" } = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            <PageHead title={title} />
            <div className="max-w-screen-2xl:container flex">
                <DashboardLayoutSidebar
                    sidebarItems={
                        type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER
                    }
                    isOpen={isOpen}
                />
                <div className="h-screen w-full overflow-y-auto p-8">
                    <Navbar
                        className="flex justify-between px-0"
                        isBlurred={false}
                        position="static"
                        classNames={{ wrapper: "p-0" }}
                    >
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <NavbarMenuToggle
                            aria-label={isOpen ? "Close Menu" : "Open Menu"}
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden"
                        />
                    </Navbar>
                    <p className="mb-4 text-small">{description}</p>
                    {children}
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardLayout;
