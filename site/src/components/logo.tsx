import { Disc3 } from "lucide-react";

export default function Logo() {
    return (
        <div className="font-instrument flex flex-row gap-1 items-center select-none">
            <Disc3 strokeWidth={0.75} className="stroke-white" />
            <span className="text-xl tracking-tight text-white">
                Between Spins
            </span>
        </div>
    );
}
