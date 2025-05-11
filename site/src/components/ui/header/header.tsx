"use client";

import * as React from "react";
import { Disc3 } from "lucide-react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import ThemeSwitcher from "../theme-switcher";

export const instrument = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
    style: "normal",
});

export type NavType = {
    name: string;
    href: string;
};
const links: NavType[] = [
    { name: "Posts", href: "/posts" },
    { name: "Search", href: "/search" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
    const sentinelRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting);
            },
            {
                rootMargin: "-1px 0px 0px 0px",
            }
        );

        const sentinel = sentinelRef.current;
        if (sentinel) observer.observe(sentinel);

        return () => {
            if (sentinel) observer.unobserve(sentinel);
        };
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 z-50 dark:bg-transparent transition-all duration-300 ${
                    isScrolled
                        ? "backdrop-blur-md backdrop-saturate-100 bg-primary/90"
                        : "bg-primary"
                } px-4 py-3 flex flex-row items-center gap-12`}
            >
                <Link href={"/"}>
                    <div className="flex flex-row gap-1 items-center">
                        <Disc3 strokeWidth={0.75} className="stroke-white" />
                        <span
                            className={`${instrument.className} text-xl font-bold tracking-tight text-white`}
                        >
                            Between Spins
                        </span>
                    </div>
                </Link>

                <nav className="ml-auto md:ml-0">
                    <ul className={`hidden md:flex md:flex-row md:gap-4`}>
                        {links.map((l, i) => (
                            <li key={i}>
                                <Link href={l.href}>
                                    <p className="text-white text-sm">
                                        {l.name}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <MobileNav links={links} />
                </nav>

                <div className="ml-auto">
                    <ThemeSwitcher />
                </div>
            </header>
            <div className="h-1" ref={sentinelRef} />
        </>
    );
}
