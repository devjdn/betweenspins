import { BaseMusicContent } from "@/types/sanity";
import Link from "next/link";
import PostCard from "./post-card";

type SectionTypes = {
    posts: BaseMusicContent[];
    title: string;
    // description: string;
    type: "album" | "single" | "thought";
};

export default function PostSection({
    posts,
    title,
    // description,
    type,
}: SectionTypes) {
    return (
        <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="space-y-4 mb-8">
                <h1 className="font-serif text-3xl">{title}</h1>
                {/* <p className="font-sans text-base text-muted-foreground">
                    {description}
                </p> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {posts.map((post, i) => (
                    <Link
                        key={i}
                        href={`/${type}/${post.slug.current}`}
                        className="group block transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <PostCard post={post} />
                    </Link>
                ))}
            </div>
        </section>
    );
}
