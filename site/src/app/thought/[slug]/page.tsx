import { getAllThoughtSlugs, thoughtForPage } from "@/app/sanity";
import PostBody from "@/components/ui/post/post-body-text";
import { Separator } from "@/components/ui/separator";
import { Thought } from "@/types/sanity";
import PostEngagement from "@/components/ui/post/post-engagement";
import type { Metadata, ResolvingMetadata } from "next";
import ThoughtHeader from "@/components/ui/thought/header";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    const thoughts = await getAllThoughtSlugs();
    return thoughts.map((thought) => ({
        slug: thought.slug,
    }));
}

type MetadataProps = {
    params: Promise<{ type: string; slug: string }>;
};

export async function generateMetadata(
    { params }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const thought = await thoughtForPage(slug);

    if (!thought) {
        return {
            title: "Thought Not Found | Between Spins",
        };
    }

    return {
        title: `${thought.title} | Between Spins`,
    };
}

export default async function ThoughtPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const thought = await thoughtForPage(slug);

    if (!thought) {
        return <h1>No Thought Found.</h1>;
    }

    return (
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl space-y-8">
            <ThoughtHeader
                title={thought.title}
                _type={"thought"}
                author={thought.author}
                publishedAt={thought.publishedAt}
            />

            <Separator orientation="horizontal" />

            <PostBody content={thought.body} />

            <Separator orientation="horizontal" />

            <PostEngagement slug={thought.slug.current} comment_count={0} />
        </article>
    );
}
