import { Albums, Tracks, Thought } from "@/types/sanity";
import Link from "next/link";
import MusicCoverCard from "./cover-cards/music-cover-card";
import ThoughtCoverCard from "./cover-cards/thought-cover-card";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type SectionTypes = {
    posts: Albums[] | Tracks[] | Thought[];
    title: string;
    type: "albums" | "tracks" | "thought";
};

export default function PostSection({ posts, title, type }: SectionTypes) {
    return (
        <section className="container mx-auto px-4 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="inline-block font-serif text-3xl">{title}</h1>
                <Link
                    href={`/${type}`}
                    className="inline-flex gap-2 items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <span>View all</span>
                    <ArrowRight className="size-4" />
                </Link>
            </div>
            <div
                className={clsx(
                    {
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8":
                            type === "albums" || type === "tracks",
                    },
                    { "flex flex-col gap-4": type === "thought" }
                )}
            >
                {posts.map((post, i) => (
                    <Link
                        key={i}
                        href={`${
                            type !== "thought" ? "/reviews/" : ""
                        }${type}/${post.slug.current}`}
                        className={clsx("group block", {
                            "transition-transform duration-200 hover:scale-[1.02]":
                                type !== "thought",
                        })}
                    >
                        {type === "albums" || type === "tracks" ? (
                            <MusicCoverCard post={post as Albums | Tracks} />
                        ) : (
                            <ThoughtCoverCard post={post as Thought} />
                        )}
                    </Link>
                ))}
            </div>
        </section>
    );
}
