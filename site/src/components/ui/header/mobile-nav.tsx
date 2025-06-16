import { NavType } from "./header";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
    SheetHeader,
    SheetClose,
} from "../sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { VisuallyHidden } from "radix-ui";

export default function MobileNav({ links }: { links: NavType[] }) {
    return (
        <div className="md:hidden h-fit">
            <Sheet>
                <SheetTrigger asChild>
                    <button className="grid place-items-center group bg-none hover:bg-none">
                        <Menu className="stroke-white size-5" />
                    </button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader className="flex flex-row justify-between items-center">
                        <Logo />
                        <SheetClose />
                        <VisuallyHidden.Root>
                            <SheetTitle>Mobile Navigation Menu</SheetTitle>
                        </VisuallyHidden.Root>
                    </SheetHeader>
                    <nav className="p-4 flex-1 h-full">
                        <ul className="flex flex-col gap-2">
                            {links.map((l, i) => (
                                <li key={i}>
                                    <Link href={l.href}>
                                        <p className="text-white font-serif text-xl tracking-tight">
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
