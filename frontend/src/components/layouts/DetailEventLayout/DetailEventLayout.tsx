import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "../LandingPageLayout/LandingPageLayoutNavbar";
import PageHead from "@/components/commons/PageHead";
import LandingPageLayoutFooter from "../LandingPageLayout/LandingPageLayoutFooter";

interface PropTypes {
    children: ReactNode;
}


const DetailEventLayout = (props: PropTypes) => {
    const { children } = props;

    return (
        <Fragment>
            <LandingPageLayoutNavbar />
            <PageHead title="Event Detail" />
            <div className="py-10 md:p-4">{children}</div>
            <LandingPageLayoutFooter />
        </Fragment>
    );
};

export default DetailEventLayout;
