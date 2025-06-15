"use client";

import * as React from "react";
import Link from "next/link";
import ThemeSwitcher from "../theme-switcher";
import Logo from "@/components/logo";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "../button";
import { siteLinks } from "../footer/footer";
import MobileNav from "./mobile-nav";

export type NavType = {
    name: string;
    href: string;
};

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
                className={`sticky top-0 z-50 border-b border-b-transparent dark:border-b-border dark:bg-black/80 transition-all duration-300 ${
                    isScrolled
                        ? "backdrop-blur-md backdrop-saturate-100 bg-primary/70"
                        : "bg-primary"
                } px-4 py-3 flex flex-row items-center gap-4`}
            >
                <Link href={"/"}>
                    <Logo />
                </Link>

                <div className="flex-1 flex flex-row justify-between items-center gap-4">
                    <ul className="hidden md:flex flex-row gap-4 w-full ml-8">
                        {siteLinks.map((l, i) => (
                            <li className="group" key={i}>
                                <Link href={l.href}>
                                    <p className="text-xs text-muted-foreground group-hover:text-white transition-colors duration-200">
                                        {l.name}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:flex gap-4 items-center">
                        <SignedOut>
                            <SignInButton>
                                <Button variant="white">Sign In</Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button variant="white">Sign Up</Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>

                <div className="ml-auto flex items-center h-fit gap-4">
                    <MobileNav links={siteLinks} />
                    <ThemeSwitcher />
                </div>
            </header>
            <div className="h-0" ref={sentinelRef} />
        </>
    );
}
