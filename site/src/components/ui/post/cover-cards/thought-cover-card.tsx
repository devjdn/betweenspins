import type { Thought } from "@/types/sanity";
import { formatDate } from "@/lib/formatDate";
import { PencilLine, CalendarRange, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { urlForImage } from "@/lib/sanity/image";

export default function ThoughtCoverCard({ post }: { post: Thought }) {
    /* Write code to get an excerpt from the post */

    return (
        <article className="group relative bg-card border border-border rounded-md p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80">
            <header className="mb-3">
                <h2 className="text-xl font-serif tracking-tight leading-tight group-hover:text-primary transition-colors duration-200">
                    {post.title}
                </h2>
            </header>

            {/* Excerpt */}
            {/* {excerpt && (
                <div className="mb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {excerpt}
                    </p>
                </div>
            )} */}

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        {post.author.image && (
                            <AvatarImage
                                src={
                                    urlForImage(post.author.image) ||
                                    "/placeholder.svg"
                                }
                                alt={post.author.name}
                            />
                        )}
                        <AvatarFallback className="text-xs capitalize">
                            {post.author.name}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {post.author.name}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarRange className="w-3 h-3" />
                            <span>{formatDate(post.publishedAt)}</span>
                        </div>
                    </div>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </div>

            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg pointer-events-none" />
        </article>
    );
}
