import { getAllThoughtSlugs, thoughtForPage } from "@/app/sanity";
import { Separator } from "@/components/ui/separator";
import type { Metadata, ResolvingMetadata } from "next";
import ThoughtHeader from "@/components/ui/thought/header";
import PTComponent from "@/components/ui/post/portable-text";
import LikeBtn from "@/components/ui/post/like-btn";

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

            <PTComponent content={thought.body} />

            <Separator orientation="horizontal" />

            <LikeBtn slug={thought.slug.current} />
        </article>
    );
}
