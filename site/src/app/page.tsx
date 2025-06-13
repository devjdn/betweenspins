import { getAllReviews, getAllThoughts } from "./sanity";
import { Review } from "../types/sanity";
import { Separator } from "@/components/ui/separator";
import PostSection from "@/components/ui/post/post-section";

export const revalidate = 60;

export default async function Home() {
    const [thoughts, reviews] = await Promise.all([
        getAllThoughts(),
        getAllReviews(),
    ]);

    return (
        <main className="container mx-auto space-y-16 py-16">
            <PostSection posts={reviews} title={"Reviews"} type={"reviews"} />

            <Separator orientation="horizontal" />

            <PostSection
                posts={thoughts}
                title={"Latest Thoughts"}
                type={"thought"}
            />
        </main>
    );
}
