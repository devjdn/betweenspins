import { getAlbums, getSingles } from "./sanity";
import { Album, Single } from "../types/sanity";
import Hero from "@/components/ui/hero";
import Link from "next/link";
import PostCard from "@/components/ui/post/post-card";
import { Separator } from "@/components/ui/separator";
import PostSection from "@/components/ui/post/post-section";

export const revalidate = 60;

export default async function Home() {
    const [albums, singles]: [Album[], Single[]] = await Promise.all([
        getAlbums(),
        getSingles(),
    ]);

    // console.log(albums);
    // console.log(singles);

    return (
        <main className="space-y-16">
            <Hero />

            <PostSection
                posts={albums}
                title={"Latest Album Reviews"}
                // description={"Check out the latest album reviews here."}
                type={"album"}
            />

            <Separator orientation="horizontal" />

            <PostSection
                posts={singles}
                title={"Latest Single Reviews"}
                // description={
                //     "Check out the most recent reviews for singles hot off the press."
                // }
                type={"single"}
            />

            <Separator orientation="horizontal" />

            <section className="container mx-auto px-4">
                <h1 className="font-serif text-3xl mb-6">Thoughts</h1>
            </section>
        </main>
    );
}
