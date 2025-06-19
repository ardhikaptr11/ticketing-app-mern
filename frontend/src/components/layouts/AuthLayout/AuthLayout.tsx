import { ReactNode } from "react";
import PageHead from "../../commons/PageHead";

interface PropTypes {
    children: ReactNode;
    title: string;
}

const AuthLayout = (props: PropTypes) => {
    const { children, title } = props;

    return (
        <>
            <PageHead title={title} />
            <section className="max-w-screen-3xl p-0 3xl:container lg:p-6">
                {children}
            </section>
        </>
    );
};

export default AuthLayout;
