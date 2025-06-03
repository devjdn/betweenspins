import { Thought } from "@/types/sanity";
import { formatDate } from "@/lib/formatDate";
import { PencilLine, CalendarRange } from "lucide-react";

export default function ThoughtCoverCard({ post }: { post: Thought }) {
    return (
        <article className="space-y-2">
            <header>
                <h2 className="text-xl font-semibold">{post.title}</h2>
            </header>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <CalendarRange className="w-4 h-4" />
                    <span>Published on {formatDate(post.publishedAt)}</span>
                </div>
            </div>
        </article>
    );
}
