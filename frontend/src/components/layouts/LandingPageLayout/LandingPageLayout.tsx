import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface PropTypes {
    children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
    const { children } = props;
    return (
        <Fragment>
            <LandingPageLayoutNavbar />
            <PageHead />
            <div className="py-10 md:p-6">{children}</div>
            <LandingPageLayoutFooter />
        </Fragment>
    );
};

export default LandingPageLayout;
