import { formatDate } from "@/lib/formatDate";
import { urlForImage } from "@/lib/sanity/image";
import { BaseMusicContent } from "@/types/sanity";
import Image from "next/image";
import { Badge } from "../badge";
import { Calendar, Music } from "lucide-react";

export default function PostCard({ post }: { post: BaseMusicContent }) {
    return (
        <article className="w-full group">
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

            <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs font-medium">
                        {post.genre}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-medium">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(post.publishedAt)}
                    </Badge>
                </div>

                <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="font-serif text-muted-foreground text-base">
                        {post.artist}
                    </p>
                </div>
            </div>
        </article>
    );
}
