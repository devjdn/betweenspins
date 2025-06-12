import {
    AlbumsWithMetadata,
    ThoughtWithMetadata,
    TracksWithMetadata,
} from "@/types/sanity";
import Link from "next/link";
import { Badge } from "../badge";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import { Calendar, Music } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import clsx from "clsx";
import MusicCoverCard from "../post/cover-cards/music-cover-card";
import ThoughtCoverCard from "../post/cover-cards/thought-cover-card";

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
                        <MusicCoverCard post={post} />
                    ) : (
                        // Thought content
                        <ThoughtCoverCard post={post} />
                    )}
                </Link>
            ))}
        </div>
    );
}
