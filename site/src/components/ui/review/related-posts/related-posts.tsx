import { urlForImage } from "@/lib/sanity/image";
import { BaseMusicContent } from "@/types/sanity";
import Link from "next/link";
import { Separator } from "../../separator";

export default async function RelatedReviewPosts({
    type,
    posts,
}: {
    type: "single" | "album";
    posts: BaseMusicContent[];
}) {
    return (
        <aside className="space-y-4 px-4 lg:p-0 lg:h-fit lg:sticky lg:top-24">
            <h3 className="font-sans font-semibold capitalize text-xl tracking-tight leading-tight">
                More {type} Reviews
            </h3>
            <Separator orientation="horizontal" />
            <div>
                <ul className="flex flex-col gap-4">
                    {posts.length > 0 ? (
                        posts.map((p, i) => (
                            <Link key={i} href={`/${type}/${p.slug.current}`}>
                                <div className="grid grid-cols-[80px_1fr] gap-2 items-end">
                                    <div>
                                        {p.mainImage && (
                                            <img
                                                className="aspect-square object-cover"
                                                src={urlForImage(p.mainImage)}
                                                alt={p.title}
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-foreground">
                                            {p.title}
                                        </h4>
                                        <h5 className="font-medium text-base text-muted-foreground">
                                            {p.artist}
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-muted-foreground">
                            No other reviews found
                        </p>
                    )}
                </ul>
            </div>
        </aside>
    );
}
