import { getAlbums, getSingles } from "./sanity";
import { Album, Single } from "../types/sanity";
import Hero from "@/components/ui/hero";
import Link from "next/link";
import PostCard from "@/components/ui/post/post-card";

export default async function Home() {
    const [albums, singles]: [Album[], Single[]] = await Promise.all([
        getAlbums(),
        getSingles(),
    ]);

    console.log(albums);
    console.log(singles);

    return (
        <main>
            <Hero />
            <section className="container mx-auto p-4 md:py-8">
                <h1 className="font-serif text-3xl mb-6">
                    Latest Album Reviews
                </h1>
                <div className="space-y-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {albums.map((album, i) => (
                            <li key={i}>
                                <Link href={`/album/${album.slug.current}`}>
                                    <PostCard post={album} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="container mx-auto p-4 md:py-8">
                <h1 className="font-serif text-3xl mb-6">
                    Latest Single Reviews
                </h1>
                <div className="space-y-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {singles.map((single, i) => (
                            <li key={i}>
                                <Link href={`/single/${single.slug.current}`}>
                                    <PostCard post={single} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="container mx-auto p-4 md:py-8">
                <h1 className="font-serif text-3xl mb-6">Thoughts</h1>
            </section>
        </main>
    );
}
