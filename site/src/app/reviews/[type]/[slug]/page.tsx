import {
    getAllReviewSlugs,
    getRelatedPosts,
    getReviewForPage,
} from "@/app/sanity";
import PTComponent from "@/components/ui/post/portable-text";
import { Separator } from "@/components/ui/separator";
import ReviewHeader from "@/components/ui/review/header";
import { BaseMusicContent } from "@/types/sanity";
import PostEngagement from "@/components/ui/post/post-engagement";
import type { Metadata, ResolvingMetadata } from "next";
import RelatedReviewPosts from "@/components/ui/review/related-posts/related-posts";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    const reviews = await getAllReviewSlugs();
    return reviews.map((review) => ({
        type: review.type,
        slug: review.slug,
    }));
}

type MetadataProps = {
    params: Promise<{ type: string; slug: string }>;
};

export async function generateMetadata(
    { params }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { type, slug } = await params;
    const review = await getReviewForPage(type, slug);

    if (!review) {
        return {
            title: "Review Not Found",
        };
    }

    return {
        title: `${review.title} by ${review.artist} | Between Spins`,
        description: review.description,
    };
}

export default async function ReviewPage({
    params,
}: {
    params: Promise<{ type: string; slug: string }>;
}) {
    const { type, slug } = await params;

    if (!["albums", "tracks"].includes(type)) {
        return <h1>Invalid review type.</h1>;
    }

    const musicType = type as "albums" | "tracks";

    const [review, relatedPosts] = await Promise.all([
        getReviewForPage(musicType, slug),
        getRelatedPosts(musicType, slug, 4),
    ]);

    if (review === null) {
        return <h1>No {musicType} review found.</h1>;
    }

    return (
        <main className="container mx-auto flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-12 px-4 py-12 md:py-20">
            {/* The post */}
            <article className="max-w-3xl mx-auto space-y-8 flex-1">
                <ReviewHeader
                    reviewType={musicType === "albums" ? "Album" : "Track"}
                    {...review}
                />

                <Separator orientation="horizontal" />

                <PTComponent content={review.body} />

                <Separator orientation="horizontal" />

                <PostEngagement slug={review.slug.current} comment_count={0} />
            </article>

            {/* Other posts of the same type */}
            <RelatedReviewPosts
                type={musicType}
                posts={relatedPosts as BaseMusicContent[]}
            />
        </main>
    );
}
