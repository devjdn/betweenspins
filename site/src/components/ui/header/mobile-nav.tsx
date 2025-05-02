import { NavType } from "./header";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "../sheet";
import { Menu } from "lucide-react";
import { Button } from "../button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";

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
                    <VisuallyHidden>
                        <SheetTitle>Mobile Navigation Menu</SheetTitle>
                    </VisuallyHidden>
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
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
