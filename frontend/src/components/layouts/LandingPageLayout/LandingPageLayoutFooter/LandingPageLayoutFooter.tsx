import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constants";

const LandingPageLayoutFooter = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <div className="flex flex-col items-center justify-between bg-slate-900 px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20">
            <Image
                src="/images/general/zentix.svg"
                width={200}
                height={100}
                alt="Zentix logo"
                className="mb-4 w-40 lg:mb-0 lg:w-60"
            />
            <div className="mb-4 flex flex-col gap-4 lg:mb-0">
                <div>
                    <h4 className="text-xl text-white">Customer Service</h4>
                    <p className="text-gray-600">
                        <Link href="mailto:support@zentix.com">
                            support@zentix.com
                        </Link>
                        <Link href="tel:+6281234567890">+62 812-3456-7890</Link>
                    </p>
                </div>
                <div>
                    <h4 className="text-xl text-white">Office</h4>
                    <p className="text-gray-600">
                        Jl. Raya Darmo No. 123
                        <br />
                        Surabaya, Indonesia - 60241
                    </p>
                </div>
            </div>

            <div className="mb-10 flex flex-col gap-2 lg:mb-0">
                <h2 className="text-xl text-white lg:mb-2">Menu</h2>
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={`footer-nav-${item.label}`}
                        href={item.href}
                        className="cursor-pointer text-gray-600 hover:text-white"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="flex flex-col items-center gap-8">
                <div className="flex items-center justify-between gap-8 text-gray-600">
                    {SOCIAL_ITEMS.map((item) => (
                        <Link
                            key={`footer-social-${item.label}`}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl hover:text-white"
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>
                <p className="text-gray-600">
                    &copy; {currentYear} Zentix. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default LandingPageLayoutFooter;
