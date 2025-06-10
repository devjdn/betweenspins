import {
    AlbumsWithMetadata,
    ThoughtWithMetadata,
    TracksWithMetadata,
} from "@/types/sanity";
import Link from "next/link";
import { Badge } from "../badge";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import { Calendar, Music } from "lucide-react";
import { format } from "date-fns";
import { formatDate } from "@/lib/formatDate";
import clsx from "clsx";

export default async function ArticlesFromAuthor({
    posts,
}: {
    posts: Array<AlbumsWithMetadata | TracksWithMetadata | ThoughtWithMetadata>;
}) {
    return (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-y-8 gap-x-4">
            {posts.map((post, i) => (
                <Link
                    key={post._id}
                    href={`${post._type !== "thought" ? "/reviews/" : ""}${
                        post._type
                    }/${post.slug.current}`}
                    className={clsx("group", {
                        "col-span-2": post._type === "thought",
                    })}
                >
                    {post._type !== "thought" ? (
                        // Music content (Albums or Tracks)
                        <div>
                            <div className="relative aspect-square overflow-hidden mb-4 bg-muted">
                                {post.mainImage ? (
                                    <Image
                                        src={urlForImage(post.mainImage)}
                                        alt={post.title}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Music className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="capitalize"
                                    >
                                        {post.genre}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="text-xs font-medium"
                                    >
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {formatDate(post.publishedAt)}
                                    </Badge>
                                </div>

                                <div>
                                    <h3 className="font-serif text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-tight text-base">
                                        {post.artist}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : // Thought content
                    null}
                </Link>
            ))}
        </div>
    );
}
