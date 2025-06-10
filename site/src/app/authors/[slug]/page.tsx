import {
    authorForPage,
    getAllAuthorPosts,
    getAllAuthorSlugs,
    getAuthorPostCount,
} from "@/app/sanity";
import ArticlesFromAuthor from "@/components/ui/author/articles";
import AuthorHeader from "@/components/ui/author/header";
import PTComponent from "@/components/ui/post/portable-text";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatDate";
import { Divide } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";

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

    const [author, postCount, authorPosts] = await Promise.all([
        authorForPage(slug),
        getAuthorPostCount(slug),
        getAllAuthorPosts(slug),
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
                    Articles from {author.name}
                </h2>
                <ArticlesFromAuthor posts={authorPosts} />
            </section>
        </main>
    );
}
