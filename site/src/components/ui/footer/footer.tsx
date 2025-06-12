import Logo from "@/components/logo";
import Link from "next/link";

type LinkType = {
    name: string;
    href: string;
};

const socialLinks: LinkType[] = [
    {
        name: "Apple Music",
        href: "https://music.apple.com/profile/jaydenpriestley",
    },
    {
        name: "Instagram",
        href: "https://instagram.com/jaydenpriestley1",
    },
    {
        name: "X/Twitter",
        href: "https://x.com/NotCellium",
    },
];

const siteLinks: LinkType[] = [
    {
        name: "Album Reviews",
        href: "/reviews/albums",
    },
    {
        name: "Track Reviews",
        href: "/reviews/tracks",
    },
    {
        name: "Thoughts",
        href: "/thought",
    },
    {
        name: "Authors",
        href: "/authors",
    },
    {
        name: "Reviews",
        href: "/reviews",
    },
];

export default function Footer() {
    return (
        <footer className="px-6 py-10 border-t border-t-border bg-primary dark:bg-black">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and tagline */}
                    <div className="flex flex-col gap-4">
                        <Logo />
                        <p className="text-sm text-muted-foreground">
                            Music reviews and thoughts from passionate
                            listeners.
                        </p>
                    </div>

                    {/* Site navigation */}
                    <div>
                        <h3 className="font-serif text-lg text-white mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {siteLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social links */}
                    <div>
                        <h3 className="font-serif text-lg text-white mb-4">
                            Connect
                        </h3>
                        <ul className="space-y-2">
                            {socialLinks.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter signup placeholder */}
                    <div>
                        <h3 className="font-serif text-lg text-white mb-4">
                            Stay Updated
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                            Subscribe for the latest reviews and articles.
                        </p>
                        <Link
                            href="#"
                            className="text-sm font-medium text-white hover:underline"
                        >
                            Subscribe →
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 pt-6 border-t border-border/30">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Between Spins. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
