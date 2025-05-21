import Logo from "@/components/logo";

type LinksType = {
    name: string;
    href: string;
};

const links: LinksType[] = [
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

export default function Footer() {
    return (
        <footer className="px-4 py-8 border-t border-t-border flex flex-col gap-8 bg-primary dark:bg-black">
            <Logo />
            <ul className="flex flex-col md:flex-row md:gap-6">
                {links.map((l, i) => (
                    <li className="w-fit" key={i}>
                        <a
                            href={l.href}
                            className="text-muted-foreground hover:text-primary-foreground"
                        >
                            <p className="text-sm">{l.name}</p>
                        </a>
                    </li>
                ))}
            </ul>
            <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Between Spins. All rights reserved.
            </p>
        </footer>
    );
}
