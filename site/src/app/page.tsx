import { getPosts } from "./sanity";
import { Instrument_Serif } from "next/font/google";
import SpotlightPost from "@/components/ui/post/spotlight-post";
import { Post } from "../types/sanity";
import Hero from "@/components/ui/hero";
import RegularPost from "@/components/ui/post/regular-post";
import Link from "next/link";

const instrument = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
    style: "normal",
});

export default async function Home() {
    const posts = await getPosts();
    const [spotlightPost, ...regularPosts] = posts as Post[];

    return (
        <div className="container mx-auto px-4 py-8">
            <Hero />

            <h1 className={`${instrument.className} text-3xl font-bold mb-6`}>
                Latest Posts
            </h1>

            {/* Spotlight Post */}
            <div className="mb-12">
                <Link href={`/post/${spotlightPost.slug.current}`}>
                    <SpotlightPost post={spotlightPost} />
                </Link>
            </div>

            {/* Regular Posts List */}
            <div className="space-y-8">
                <ul className="flex flex-col gap-6">
                    {regularPosts.map((post, i) => (
                        <li key={i}>
                            <Link href={`/post/${post.slug.current}`}>
                                <RegularPost post={post} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
