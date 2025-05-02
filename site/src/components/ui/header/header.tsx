import { Disc3 } from "lucide-react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";

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
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Search", href: "/search" },
];

export default function Header() {
    return (
        <header className="bg-primary dark:bg-transparent px-4 py-3 flex flex-row items-center gap-12">
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
                <ul
                    className={`${instrument.className} hidden md:flex md:flex-row md:gap-4`}
                >
                    {links.map((l, i) => (
                        <li key={i}>
                            <Link href={l.href}>
                                <p className="">{l.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <MobileNav links={links} />
            </nav>
        </header>
    );
}
