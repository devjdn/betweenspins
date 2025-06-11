import { getLatestOfPostType } from "./sanity";
import { Albums, Tracks } from "../types/sanity";
import { Separator } from "@/components/ui/separator";
import PostSection from "@/components/ui/post/post-section";

export const revalidate = 60;

export default async function Home() {
    const [albums, tracks, thoughts] = await Promise.all([
        getLatestOfPostType("albums"),
        getLatestOfPostType("tracks"),
        getLatestOfPostType("thought"),
    ]);

    return (
        <main className="space-y-16 py-16">
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
