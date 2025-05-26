import { getAllAlbumSlugs, albumForPage } from "@/app/sanity";
import PostBody from "@/components/ui/post/post-body";
import { Separator } from "@/components/ui/separator";
import ReviewHeader from "@/components/ui/review/header";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    const slugs = await getAllAlbumSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function AlbumPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const album = await albumForPage(slug);
    console.log(album);

    if (album === null) {
        return <h1>No album found.</h1>;
    }

    return (
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl space-y-8">
            <ReviewHeader reviewType="Album" {...album} />

            <Separator orientation="horizontal" />

            <PostBody content={album.body} />
        </article>
    );
}
