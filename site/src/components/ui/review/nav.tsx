"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const reviewLinks = [
    { name: "All Reviews", href: "/reviews" },
    { name: "Album Reviews", href: "/reviews/albums" },
    { name: "Track Reviews", href: "/reviews/tracks" },
    { name: "Classic Reviews", href: "/reviews/classics" },
];

export default function ReviewsNav() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-4 border-b">
            {reviewLinks.map((link, i) => (
                <Link
                    href={link.href}
                    key={i}
                    className={clsx(
                        "text-sm pb-2 border-b-2 transition-colors",
                        pathname === link.href
                            ? "text-primary border-primary"
                            : "text-muted-foreground border-transparent hover:text-primary hover:border-primary"
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
}
