import { getPosts } from "./sanity";
import { Post } from "../types/sanity";
import Hero from "@/components/ui/hero";
import Link from "next/link";
import PostCard from "@/components/ui/post/post-card";

export default async function Home() {
    const posts = await getPosts();
    console.log(posts);
    const regularPosts = posts as Post[];

    return (
        <div>
            <Hero />
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-serif text-3xl font-bold mb-6">
                    Latest Posts
                </h1>
                <div className="space-y-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {regularPosts.map((post, i) => (
                            <li key={i}>
                                <Link href={`/post/${post.slug.current}`}>
                                    <PostCard post={post} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
