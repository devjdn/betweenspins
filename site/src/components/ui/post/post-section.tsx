import { Albums, Tracks, Thought } from "@/types/sanity";
import Link from "next/link";
import MusicCoverCard from "./cover-cards/music-cover-card";
import ThoughtCoverCard from "./cover-cards/thought-cover-card";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type SectionTypes =
    | {
          posts: Array<Albums | Tracks>;
          title: string;
          type: "reviews";
      }
    | {
          posts: Thought[];
          title: string;
          type: "thought";
      };

export default function PostSection({ posts, title, type }: SectionTypes) {
    return (
        <section className="mx-auto px-4 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="inline-block tracking-tight font-serif text-3xl">
                    {title}
                </h1>
                <Link
                    href={`${type === "reviews" ? "/reviews" : "/thought"}`}
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
                            type === "reviews",
                    },
                    { "flex flex-col gap-4": type === "thought" }
                )}
            >
                <div
                    className={clsx(
                        {
                            "grid grid-flow-col auto-cols-[200px] sm:auto-cols-[220px] md:auto-cols-[240px] gap-4 md:gap-6 w-fit":
                                type === "reviews",
                        },
                        {
                            "flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3":
                                type === "thought",
                        }
                    )}
                >
                    {type === "reviews"
                        ? posts.map((post, i) => (
                              <Link
                                  key={i}
                                  href={`/reviews/${post._type}/${post.slug.current}`}
                                  className="group block"
                              >
                                  <MusicCoverCard post={post} />
                              </Link>
                          ))
                        : posts.map((post, i) => (
                              <Link
                                  key={i}
                                  href={`/thought/${post.slug.current}`}
                                  className="group block"
                              >
                                  <ThoughtCoverCard post={post} />
                              </Link>
                          ))}
                </div>
            </div>
        </section>
    );
}
