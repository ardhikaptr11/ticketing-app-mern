import { ReactNode } from "react";
import PageHead from "../../commons/PageHead";

interface PropTypes {
    children: ReactNode;
    title: string;
}

const AuthLayout = (props: PropTypes) => {
    const { children, title } = props;

    return (
        <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
            <PageHead title={title} />
            <section className="max-w-screen-2xl p-0 2xl:container lg:p-6">
                {children}
            </section>
        </div>
    );
};

export default AuthLayout;
