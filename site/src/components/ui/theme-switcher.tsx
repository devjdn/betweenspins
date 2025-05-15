"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "./dropdown-menu";
import { Laptop, MoonStar, Sun } from "lucide-react";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="ml-auto">
                    {theme === "dark" ? (
                        <MoonStar className="stroke-white" size={16} />
                    ) : theme === "light" ? (
                        <Sun className="stroke-white" size={16} />
                    ) : theme === "system" ? (
                        <Laptop className="stroke-white" size={16} />
                    ) : null}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4" side="bottom" sideOffset={8}>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value={"light"}>
                        Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={"dark"}>
                        Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={"system"}>
                        System
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
