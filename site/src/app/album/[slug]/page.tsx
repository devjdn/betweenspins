import { getAllAlbumSlugs, albumForPage } from "@/app/sanity";
import { Badge } from "@/components/ui/badge";
import PostBody from "@/components/ui/post/post-body";
import { Separator } from "@/components/ui/separator";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import { PencilLine, CalendarRange, ListMusic } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import Rating from "@/components/ui/review/rating";

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
            <header className="flex flex-col gap-8">
                <div className="flex flex-col-reverse md:flex-row md:items-end gap-8">
                    {album.mainImage && (
                        <div className="w-full md:w-1/3">
                            <Image
                                className="aspect-square w-full object-cover object-center shadow-lg rounded-lg"
                                height={400}
                                width={400}
                                priority
                                src={urlForImage(album.mainImage)}
                                alt="Cover photo"
                            />
                        </div>
                    )}
                    <div className="w-full md:w-2/3 space-y-4">
                        <Badge className="mx-auto" variant={"post"}>
                            Album
                        </Badge>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {album.title}
                            </h1>
                            <h2 className="text-xl md:text-2xl text-muted-foreground">
                                {album.artist}
                            </h2>
                        </div>
                        <Badge variant={"default"}>{album.genre}</Badge>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <ListMusic className="w-4 h-4" />
                                <span>Released in {album.releaseDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <PencilLine className="w-4 h-4" />
                                <span>
                                    By{" "}
                                    <span className="font-medium text-foreground">
                                        {album.author.name}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarRange className="w-4 h-4" />
                                <span>
                                    Published on {formatDate(album.publishedAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <Rating rating={album.rating} />
                <div className="rounded-md bg-muted p-4 border">
                    <p className="text-muted-foreground text-base">
                        {album.description}
                    </p>
                </div>
            </header>

            <Separator orientation="horizontal" />

            <div>
                <PostBody content={album.body} />
            </div>
        </article>
    );
}
