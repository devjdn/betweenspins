import { formatDate } from "@/lib/formatDate";
import { urlForImage } from "@/lib/sanity/image";
import { Post } from "@/types/sanity";

interface RegularPostProps {
    post: Post;
}

export default function RegularPost({ post }: RegularPostProps) {
    return (
        <article className="grid grid-cols-[180px_1fr] gap-4">
            <div className="relative aspect-square overflow-hidden">
                {post.mainImage && (
                    <img
                        src={urlForImage(post.mainImage)}
                        alt={post.title}
                        loading="lazy"
                        className="object-cover z-0"
                    />
                )}
            </div>
            <div className="flex flex-col justify-end">
                <p className="text-muted-foreground">
                    {formatDate(post.publishedAt)}
                </p>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="font-medium text-muted-foreground">
                    {post.genre}
                </p>
            </div>
        </article>
    );
}
