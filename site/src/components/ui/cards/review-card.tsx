import { formatDate } from "@/lib/formatDate";
import { urlForImage } from "@/lib/sanity/image";
import { Review } from "@/types/sanity";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, Music as MusicIcon } from "lucide-react";

export default function ReviewCard({ post }: { post: Review }) {
    return (
        <article className="w-full group">
            <div className="relative aspect-square mb-2 bg-muted rounded-sm overflow-hidden group-hover:shadow-md transition-shadow duration-300">
                {post.mainImage ? (
                    <Image
                        src={urlForImage(post.mainImage)}
                        alt={post.title}
                        width={400}
                        height={400}
                        priority
                        className="object-cover duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <MusicIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div className="space-y-2">
                <div className="line-clamp-2">
                    <h3 className="font-serif text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-tight text-sm">
                        {post.artist}
                    </p>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                    <Badge variant="outline" className="capitalize font-medium">
                        {post.genre}
                    </Badge>
                    <Badge variant="outline" className="font-medium">
                        <CalendarRange className="h-3 w-3 mr-1" />
                        {formatDate(post.publishedAt)}
                    </Badge>
                </div>
            </div>
        </article>
    );
}
