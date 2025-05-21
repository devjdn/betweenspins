import Image from "next/image";
import Sunset from "../../../public/hero-sunset.png";

export default function Hero() {
    return (
        <section className="w-full grid text-center font-serif mb-16 border-b border-b-border">
            <div className="relative min-h-[60vh] w-full col-start-1 row-start-1 z-1">
                <Image
                    src={Sunset.src}
                    fill
                    priority
                    alt="Calm sunset background for the hero."
                    className="object-cover object-center"
                />
            </div>
            <div className="col-start-1 row-start-1 z-2 text-white place-self-center px-10">
                <h1 className="text-4xl md:text-6xl">
                    Judge music by the way it makes <em>you feel</em>,
                </h1>
                <p className="text-xl md:text-2xl">
                    not the way it makes <s>others feel</s>.
                </p>
            </div>
        </section>
    );
}
