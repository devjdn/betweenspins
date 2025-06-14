import {
    authorForPage,
    getAllAuthorReviews,
    getAllAuthorSlugs,
    getAllAuthorThoughts,
    getAuthorPostCount,
} from "@/app/sanity";
import AuthorHeader from "@/components/ui/author/header";
import ThoughtCard from "@/components/ui/cards/thought-card";
import ReviewCard from "@/components/ui/cards/review-card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatDate";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    const authors = await getAllAuthorSlugs();
    return authors.map((author) => ({
        slug: author.slug,
    }));
}

type MetadataProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const author = await authorForPage(slug);

    if (!author) {
        return {
            title: "Thought Not Found | Between Spins",
        };
    }

    return {
        title: `${author.name} | Between Spins`,
    };
}

export default async function AuthorPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [author, postCount, authorReviews, authorThoughts] =
        await Promise.all([
            authorForPage(slug),
            getAuthorPostCount(slug),
            getAllAuthorReviews(slug),
            getAllAuthorThoughts(slug),
        ]);

    if (!author) {
        return <h1>No author found.</h1>;
    }

    return (
        <main className="flex flex-col max-w-4xl mx-auto space-y-8 px-4 md:px-12 py-12 md:py-20">
            {/* Contains author details */}
            <AuthorHeader {...author} />

            <Separator orientation="horizontal" />

            {/* Section for their stats */}
            <section className="space-y-2 text-center">
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
                    About
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3 rounded-md bg-muted p-4">
                        {author.bio && (
                            <p className="text-muted-foreground text-base">
                                {author.bio}
                            </p>
                        )}
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                        <h3 className="text-lg font-serif">
                            Contributing Since
                        </h3>
                        <p className="text-muted-foreground">
                            {formatDate(author._createdAt)}
                        </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                        <h3 className="text-lg font-serif">Posts Authored</h3>
                        <p className="text-muted-foreground">{postCount}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                        <h3 className="text-lg font-serif">Favourite Artist</h3>
                        <p className="text-muted-foreground">
                            {author.favouriteArtist}
                        </p>
                    </div>
                </div>
            </section>

            <Separator orientation="horizontal" />

            {/**
             * Contains their posts written
             * Could be a paginated list for when they go over a certain limit at a time
             * Pagination would improve performance, especially for authors with a lot of posts
             */}
            <section className="space-y-8">
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-center">
                    Reviews from {author.name}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                    {authorReviews.map((post, i) => (
                        <Link
                            key={post._id}
                            href={`/reviews/${post._type}/${post.slug.current}`}
                            className="group"
                        >
                            <ReviewCard post={post} />
                        </Link>
                    ))}
                </div>
            </section>

            <Separator orientation="horizontal" />

            <section className="space-y-8">
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-center">
                    Thoughts from {author.name}
                </h2>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-y-8 gap-x-4">
                    {authorThoughts.map((post, i) => (
                        <Link
                            key={post._id}
                            href={`/reviews/${post._type}/${post.slug.current}`}
                            className="group"
                        >
                            <ThoughtCard post={post} />
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
