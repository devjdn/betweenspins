import Image from "next/image";
import { Post } from "../../../types/sanity";
import { urlForImage } from "@/lib/sanity/image";
import { formatDate } from "@/lib/formatDate";

interface SpotlightPostProps {
    post: Post;
}

export default function SpotlightPost({ post }: SpotlightPostProps) {
    return (
        <article className="grid grid-cols-[240px_1fr] gap-4">
            <div className="relative aspect-square overflow-hidden">
                {post.mainImage && (
                    <Image
                        src={urlForImage(post.mainImage)}
                        alt={post.title}
                        fill
                        priority
                        className="object-cover z-0"
                    />
                )}
            </div>
            <div className="flex flex-col justify-end">
                <p className="text-muted-foreground">
                    {formatDate(post.publishedAt)}
                </p>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <h3 className="t">{post.artist}</h3>
                <p className="font-medium text-muted-foreground">
                    {post.genre}
                </p>
            </div>
        </article>
    );
}
