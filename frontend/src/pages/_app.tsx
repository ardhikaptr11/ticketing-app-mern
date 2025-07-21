import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";
import { onErrorHandler } from "@/libs/axios/responseHandler";
import { ModalProvider } from "@/contexts/ModalContext";
import { SessionExpiredModalListener } from "@/components/ui/SessionExpiredModal/SessionExpiredModal";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            throwOnError(error) {
                onErrorHandler(error);
                return false;
            },
        },
        mutations: {
            onError: onErrorHandler,
        },
    },
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <HeroUIProvider>
                    <ModalProvider>
                        <SessionExpiredModalListener />
                        <ToasterProvider>
                            <AppShell>
                                <Component {...pageProps} />
                            </AppShell>
                        </ToasterProvider>
                    </ModalProvider>
                </HeroUIProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default App;
