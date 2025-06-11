import { urlForImage } from "@/lib/sanity/image";
import { BaseMusicContent } from "@/types/sanity";
import Link from "next/link";
import { Separator } from "../../separator";

export default async function RelatedReviewPosts({
    type,
    posts,
}: {
    type: "albums" | "tracks";
    posts: BaseMusicContent[];
}) {
    return (
        <aside className="space-y-4 lg:px-4 lg:p-0 lg:h-fit lg:sticky lg:top-24">
            <h3 className="font-serif capitalize text-xl tracking-tight leading-tight">
                More {type === "albums" ? "Album" : "Track"} Reviews
            </h3>
            <Separator orientation="horizontal" />
            <div>
                <ul className="flex flex-col gap-4">
                    {posts.length > 0 ? (
                        posts.map((p, i) => (
                            <div key={i} className="space-y-4">
                                <Link
                                    className="block"
                                    href={`/reviews/${type}/${p.slug.current}`}
                                >
                                    <div className="grid grid-cols-[80px_1fr] gap-3 items-center">
                                        <div>
                                            {p.mainImage && (
                                                <img
                                                    className="aspect-square object-cover rounded-sm"
                                                    src={urlForImage(
                                                        p.mainImage
                                                    )}
                                                    alt={p.title}
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>
                                        <div className="leading-snug">
                                            <h4 className="font-serif text-base text-foreground">
                                                {p.title}
                                            </h4>
                                            <h5 className="text-sm text-muted-foreground">
                                                {p.artist}
                                            </h5>
                                        </div>
                                    </div>
                                </Link>
                                <Separator orientation="horizontal" />
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">
                            No other reviews found
                        </p>
                    )}
                </ul>
            </div>
            <Link href={`/reviews/${type}`}></Link>
        </aside>
    );
}
