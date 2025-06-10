import { getFourLatestOfPostType } from "./sanity";
import { Albums, Tracks, Thought } from "../types/sanity";
import Hero from "@/components/ui/hero";
import { Separator } from "@/components/ui/separator";
import PostSection from "@/components/ui/post/post-section";

export const revalidate = 60;

export default async function Home() {
    const [albums, tracks, thoughts] = await Promise.all([
        getFourLatestOfPostType("albums"),
        getFourLatestOfPostType("tracks"),
        getFourLatestOfPostType("thought"),
    ]);

    return (
        <main className="space-y-16 py-16">
            {/* <Hero /> */}

            <PostSection
                posts={albums as Albums[]}
                title={"Latest Album Reviews"}
                type={"albums"}
            />

            <Separator orientation="horizontal" />

            <PostSection
                posts={tracks as Tracks[]}
                title={"Latest Track Reviews"}
                type={"tracks"}
            />

            <Separator orientation="horizontal" />

            <PostSection
                posts={thoughts}
                title={"Latest Thoughts"}
                type={"thought"}
            />
        </main>
    );
}
