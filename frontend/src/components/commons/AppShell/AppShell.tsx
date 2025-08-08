import Toaster from "@/components/ui/Toaster";
import { defaultToaster, ToasterContext } from "@/contexts/ToasterContext";
import cn from "@/utils/cn";
import { Inter } from "next/font/google";
import { ReactNode, useContext, useEffect, useState } from "react";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface PropTypes {
    children: ReactNode;
}

const AppShell = (props: PropTypes) => {
    const { children } = props;

    const { toaster, setToaster } = useContext(ToasterContext);

    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (!toaster.message) return;

        setIsShowing(true);

        const timer = setTimeout(() => {
            setIsShowing(false);

            setTimeout(() => {
                setToaster(defaultToaster);
            }, 500);
        }, 2500);

        return () => clearTimeout(timer);
    }, [toaster]);

    return (
        <main className={cn(inter.className)}>
            {children}
            <Toaster
                type={toaster.type}
                message={toaster.message}
                isShowing={isShowing}
                afterLoginSuccess={!!toaster.afterLoginSuccess}
            />
        </main>
    );
};

export default AppShell;
