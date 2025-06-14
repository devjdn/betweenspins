import {
    AlbumsWithMetadata,
    ThoughtWithMetadata,
    TracksWithMetadata,
} from "@/types/sanity";
import ThoughtCard from "../cards/thought-card";
import ReviewCard from "../cards/review-card";
import Link from "next/link";

export default async function ArticlesFromAuthor({
    posts,
}: {
    posts: Array<AlbumsWithMetadata | TracksWithMetadata | ThoughtWithMetadata>;
}) {
    return (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-y-8 gap-x-4">
            {posts.map((post, i) => (
                <Link
                    key={post._id}
                    href={`${post._type !== "thought" ? "/reviews/" : ""}${
                        post._type
                    }/${post.slug.current}`}
                    className="group"
                >
                    {post._type !== "thought" ? (
                        // Music content (Albums or Tracks)
                        <ReviewCard post={post} />
                    ) : (
                        // Thought content
                        <ThoughtCard post={post} />
                    )}
                </Link>
            ))}
        </div>
    );
}
