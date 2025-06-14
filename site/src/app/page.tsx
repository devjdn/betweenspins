import { getAllReviews, getAllThoughts } from "./sanity";
import { Separator } from "@/components/ui/separator";
import PostSection from "@/components/ui/home/post-section";
import FeaturedReview from "@/components/ui/home/featured-review";

export const revalidate = 60;

export default async function Home() {
    const [thoughts, reviews] = await Promise.all([
        getAllThoughts(),
        getAllReviews(),
    ]);

    const mostRecentAlbumReview = reviews.find((r) => r.reviewType === "album");

    const remainingReviews = reviews.filter(
        (r) => r._id !== mostRecentAlbumReview?._id
    );

    return (
        <main className="space-y-16">
            {mostRecentAlbumReview ? (
                <FeaturedReview review={mostRecentAlbumReview} />
            ) : (
                <FeaturedReview review={reviews[0]} />
            )}

            <section className="container mx-auto space-y-16 pb-16">
                <PostSection
                    posts={remainingReviews}
                    title={"Reviews"}
                    type={"reviews"}
                />

                <Separator orientation="horizontal" />

                <PostSection
                    posts={thoughts}
                    title={"Latest Thoughts"}
                    type={"thought"}
                />
            </section>
        </main>
    );
}
