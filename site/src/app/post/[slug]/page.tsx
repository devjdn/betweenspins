import { postForPage } from "@/app/sanity";
import AuthoredBy from "@/components/ui/post-page/authored-by";
import PostBody from "@/components/ui/post-page/post-body";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await postForPage(slug);
    console.log(post);

    if (post === null) {
        return <h1>No post found.</h1>;
    }

    return (
        <article className="relative container mx-auto px-4 pt-8 mb-24">
            <header className="flex flex-col gap-8 border-b border-b-border pb-12 mb-12 text-center">
                <div>
                    <h1 className="font-serif text-4xl">{post.title}</h1>
                    <h2 className="font-serif text-3xl">{post.artist}</h2>
                </div>

                <div className="mx-auto max-w-prose">
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <h2 className="font-serif text-3xl">{post.rating} / 100</h2>
                </div>

                {post.mainImage && (
                    <div className="relative aspect-square w-full max-w-sm mx-auto">
                        <Image
                            className="w-full h-full bg-black object-cover object-center"
                            fill
                            priority
                            src={urlForImage(post.mainImage)}
                            alt="Cover photo"
                        />
                    </div>
                )}
                <div>
                    <p className="text-sm text-muted-foreground">Genre</p>
                    <h2 className="font-serif text-3xl">{post.genre}</h2>
                </div>
                <div className="flex flex-col items-center gap-8">
                    <p className="max-w-prose">{post.description}</p>
                    <AuthoredBy
                        image={post.author.image}
                        name={post.author.name}
                    />
                </div>
            </header>

            <div className="mb-12 mx-auto max-w-prose">
                <PostBody content={post.body} />
            </div>
        </article>
    );
}
