import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";

import cn from "@/utils/cn";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <main
                    className={cn(
                        inter.className,
                        "flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0",
                    )}
                >
                    <Component {...pageProps} />
                </main>
            </HeroUIProvider>
        </QueryClientProvider>
    );
}
