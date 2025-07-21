import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";

interface PropTypes {
    children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
    const { children } = props;
    return (
        <Fragment>
            <LandingPageLayoutNavbar />
            <PageHead />
            <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
                {children}
            </div>
        </Fragment>
    );
};

export default LandingPageLayout;
