import {
    getAllReviewSlugs,
    getRelatedPosts,
    getReviewForPage,
} from "@/app/sanity";
import PostBody from "@/components/ui/post/post-body-text";
import { Separator } from "@/components/ui/separator";
import ReviewHeader from "@/components/ui/review/header";
import { Album, BaseMusicContent, Single } from "@/types/sanity";
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
            title: "Review Not Found | Between Spins",
            description: "The requested review could not be found.",
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

    if (!["album", "single"].includes(type)) {
        return <h1>Invalid review type.</h1>;
    }

    const [review, relatedPosts] = await Promise.all([
        getReviewForPage(type, slug),
        getRelatedPosts(type, slug, 3),
    ]);

    if (review === null) {
        return <h1>No {type} review found.</h1>;
    }

    const reviewData = review as Album | Single;

    return (
        <main className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-12 px-4 md:px-12 py-12 md:py-20">
            {/* The post */}
            <article className="container mx-auto max-w-4xl space-y-8 flex-1">
                <ReviewHeader
                    reviewType={type === "album" ? "Album" : "Single"}
                    {...reviewData}
                />

                <Separator orientation="horizontal" />

                <PostBody content={reviewData.body} />

                <Separator orientation="horizontal" />

                <PostEngagement
                    slug={reviewData.slug.current}
                    comment_count={0}
                />
            </article>

            {/* Other posts of the same type */}
            <RelatedReviewPosts
                type={"album"}
                posts={relatedPosts as BaseMusicContent[]}
            />
        </main>
    );
}
