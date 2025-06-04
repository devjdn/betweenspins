import {
    getAlbums,
    getFourLatestOfPostType,
    getSingles,
    getThoughts,
} from "./sanity";
import { Album, Single, Thought } from "../types/sanity";
import Hero from "@/components/ui/hero";
import { Separator } from "@/components/ui/separator";
import PostSection from "@/components/ui/post/post-section";

export const revalidate = 60;

export default async function Home() {
    const [albums, singles, thoughts] = await Promise.all([
        getFourLatestOfPostType("album"),
        getFourLatestOfPostType("single"),
        getFourLatestOfPostType("thought"),
    ]);

    // console.log(albums);
    // console.log(singles);
    // console.log(thoughts);

    return (
        <main className="space-y-16 pb-16">
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

            <PostSection
                posts={thoughts}
                title={"Latest Thoughts"}
                type={"thought"}
            />
        </main>
    );
}
