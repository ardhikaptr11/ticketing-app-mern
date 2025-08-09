import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                toasterIn: {
                    "0%": {
                        display: "none",
                        opacity: "0",
                        transform: "translateY(-20px)",
                    },
                    "100%": {
                        display: "block",
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                toasterOut: {
                    "0%": {
                        display: "block",
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                    "100%": {
                        display: "none",
                        opacity: "0",
                        transform: "translateY(-20px)",
                    },
                },
            },
            animation: {
                toasterIn:
                    "toasterIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                toasterOut:
                    "toasterOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                lato: ["Lato", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()],
};
export default config;
