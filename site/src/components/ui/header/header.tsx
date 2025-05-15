"use client";

import * as React from "react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import ThemeSwitcher from "../theme-switcher";
import Logo from "@/components/logo";

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
                className={`sticky top-0 z-50 border-b border-b-border dark:bg-black/80 transition-all duration-300 ${
                    isScrolled
                        ? "backdrop-blur-md backdrop-saturate-100 bg-primary/70"
                        : "bg-primary"
                } px-4 py-3 flex flex-row items-center gap-12`}
            >
                <Link href={"/"}>
                    <Logo />
                </Link>

                <nav className="ml-auto md:ml-0">
                    {/* <ul className={`hidden md:flex md:flex-row md:gap-4`}>
                        {links.map((l, i) => (
                            <li key={i}>
                                <Link href={l.href}>
                                    <p className="text-white text-sm">
                                        {l.name}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul> */}
                    <MobileNav links={links} />
                </nav>

                <ThemeSwitcher />
            </header>
            <div className="h-1" ref={sentinelRef} />
        </>
    );
}
