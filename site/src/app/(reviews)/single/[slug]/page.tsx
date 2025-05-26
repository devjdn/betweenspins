import { singleForPage, getAllSingleSlugs } from "@/app/sanity";
import PostBody from "@/components/ui/post/post-body";
import { Separator } from "@/components/ui/separator";
import ReviewHeader from "@/components/ui/review/header";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    const slugs = await getAllSingleSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function SinglePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const single = await singleForPage(slug);
    console.log(single);

    if (single === null) {
        return <h1>No single found.</h1>;
    }

    return (
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl space-y-8">
            <ReviewHeader reviewType={"Single"} {...single} />

            <Separator orientation="horizontal" />

            <PostBody content={single.body} />
        </article>
    );
}
