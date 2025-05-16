import { Disc3 } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex flex-row gap-1 items-center select-none">
            <Disc3 strokeWidth={0.75} className="stroke-white" />
            <span className="font-serif text-xl tracking-tight text-white">
                Between Spins
            </span>
        </div>
    );
}
