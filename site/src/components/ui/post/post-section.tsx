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
                    href={`/reviews/${type}`}
                    className="inline-flex gap-2 items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <span>View all</span>
                    <ArrowRight className="size-4" />
                </Link>
            </div>
            <div
                className={clsx(
                    {
                        "overflow-x-auto pb-4 scrollbar-hide":
                            type === "albums" || type === "tracks",
                    },
                    { "flex flex-col gap-4": type === "thought" }
                )}
            >
                <div
                    className={clsx({
                        "grid grid-flow-col auto-cols-[200px] sm:auto-cols-[220px] md:auto-cols-[240px] gap-4 md:gap-6 w-fit":
                            type === "albums" || type === "tracks",
                    })}
                >
                    {type === "albums" || type === "tracks"
                        ? posts.map((post, i) => (
                              <Link
                                  key={i}
                                  href={`/reviews/${type}/${post.slug.current}`}
                                  className="group block"
                              >
                                  <MusicCoverCard
                                      post={post as Albums | Tracks}
                                  />
                              </Link>
                          ))
                        : posts.map((post, i) => (
                              <Link
                                  key={i}
                                  href={`/thought/${post.slug.current}`}
                                  className="group block"
                              >
                                  <ThoughtCoverCard post={post as Thought} />
                              </Link>
                          ))}
                </div>
            </div>
        </section>
    );
}
