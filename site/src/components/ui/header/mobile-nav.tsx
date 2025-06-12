import { NavType } from "./header";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "../sheet";
import { Menu } from "lucide-react";
import { Button } from "../button";
import { VisuallyHidden } from "radix-ui";
import Link from "next/link";
import ThemeSwitcher from "../theme-switcher";

export default function MobileNav({ links }: { links: NavType[] }) {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={"ghost"}>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <VisuallyHidden.Root>
                        <SheetTitle>Mobile Navigation Menu</SheetTitle>
                    </VisuallyHidden.Root>
                    <nav className="p-4">
                        <ul className="flex flex-col gap-2">
                            {links.map((l, i) => (
                                <li key={i}>
                                    <Link href={l.href}>
                                        <p className="font-semibold text-xl">
                                            {l.name}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ThemeSwitcher />
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
