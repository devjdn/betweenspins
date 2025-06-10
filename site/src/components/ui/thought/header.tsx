import { formatDate } from "@/lib/formatDate";
import { Thought } from "@/types/sanity";
import { CalendarRange, ListMusic, PencilLine } from "lucide-react";
import { Badge } from "../badge";
import Link from "next/link";

type ThoughtHeaderProps = Omit<Thought, "_id" | "slug" | "categories" | "body">;

export default function ThoughtHeader({ ...props }: ThoughtHeaderProps) {
    return (
        <header className="flex flex-col gap-4">
            <Badge variant={"post"}>Thought</Badge>
            <h1 className="font-serif text-3xl md:text-4xl  tracking-tight">
                {props.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <PencilLine className="w-4 h-4" />
                    <span>
                        By{" "}
                        <Link href={`/authors/${props.author.slug.current}`}>
                            <span className="font-medium text-foreground">
                                {props.author.name}
                            </span>
                        </Link>
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <CalendarRange className="w-4 h-4" />
                    <span>Published on {formatDate(props.publishedAt)}</span>
                </div>
            </div>
        </header>
    );
}
