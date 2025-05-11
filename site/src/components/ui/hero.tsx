import { Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

export default function Hero() {
    return (
        <div className="text-center py-16 mb-16 border-b border-b-border">
            <h1 className={`${instrument.className} text-6xl text-foreground`}>
                An unprofessional opinion on the best music.
            </h1>
        </div>
    );
}
