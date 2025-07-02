import { Inter } from "next/font/google";
import { User } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <PageHead title="Zentix | Home" />
            <User
                avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
                description="Product Designer"
                name="Jane Doe"
            />
        </main>
    );
}
