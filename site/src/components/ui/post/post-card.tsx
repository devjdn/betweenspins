import { formatDate } from "@/lib/formatDate";
import { urlForImage } from "@/lib/sanity/image";
import { Post } from "@/types/sanity";
import Image from "next/image";

export default function PostCard({ post }: { post: Post }) {
    return (
        <article className="w-full">
            <div className="relative border border-border aspect-square overflow-hidden block mb-2">
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
            <div>
                <p className="text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)}
                </p>
                <p className="font-serif leading-5 text-lg">{post.title}</p>
                <p className="font-serif text-lg">{post.artist}</p>
            </div>
        </article>
    );
}
