import { Disc3 } from "lucide-react";
import { Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

export default function Logo() {
    return (
        <div className="flex flex-row gap-1 items-center select-none">
            <Disc3 strokeWidth={0.75} className="stroke-white" />
            <span
                className={`${instrument.className} text-xl font-bold tracking-tight text-white`}
            >
                Between Spins
            </span>
        </div>
    );
}
