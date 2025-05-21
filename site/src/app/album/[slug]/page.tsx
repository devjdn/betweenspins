import { getAllAlbumSlugs, albumForPage } from "@/app/sanity";
import AuthoredBy from "@/components/ui/post/authored-by";
import PostBody from "@/components/ui/post/post-body";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";

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
        <article className="relative container mx-auto px-4 my-20">
            <header className="flex flex-col gap-8 border-b border-b-border pb-12 mb-12 text-center">
                <div>
                    <h1 className="font-serif text-4xl">{album.title}</h1>
                    <h2 className="font-serif text-3xl">{album.artist}</h2>
                </div>

                <div className="mx-auto max-w-prose">
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <h2 className="font-serif text-3xl">
                        {album.rating} / 100
                    </h2>
                </div>

                {album.mainImage && (
                    <div className="relative aspect-square w-full max-w-sm mx-auto">
                        <Image
                            className="w-full h-full bg-black object-cover object-center"
                            fill
                            priority
                            src={urlForImage(album.mainImage)}
                            alt="Cover photo"
                        />
                    </div>
                )}
                <div className="flex gap-10 justify-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Genre</p>
                        <h2 className="font-serif text-3xl">{album.genre}</h2>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Release Date
                        </p>
                        <h2 className="font-serif text-3xl">
                            {album.releaseDate}
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-8">
                    <p className="max-w-prose">{album.description}</p>
                    <AuthoredBy
                        image={album.author.image}
                        name={album.author.name}
                    />
                </div>
            </header>

            <div className="mb-12 mx-auto max-w-prose">
                <PostBody content={album.body} />
            </div>
        </article>
    );
}
