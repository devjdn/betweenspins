import { getAllClassicReviews, getAllFromReviewType } from "@/app/sanity";
import ReviewCard from "@/components/ui/cards/review-card";
import ReviewsNav from "@/components/ui/review/nav";
import { Review } from "@/types/sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ReviewsTypePage({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;

    let reviews: Review[] = [];

    if (type === "albums" || type === "tracks") {
        reviews = await getAllFromReviewType(type);
    } else if (type === "classics") {
        reviews = await getAllClassicReviews();
    } else {
        notFound();
    }

    return (
        <main className="container mx-auto space-y-8 px-4 py-16">
            <header className="space-y-4">
                <h1 className="font-serif capitalize tracking-tight text-3xl md:text-4xl">
                    {type === "classics"
                        ? "Classic Reviews"
                        : type === "albums"
                        ? "Album Reviews"
                        : "Track Reviews"}
                </h1>
                <ReviewsNav />
            </header>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8">
                {reviews.map((r, i) => (
                    <Link
                        href={`/reviews/${
                            r.reviewType === "albums"
                                ? "albums"
                                : r.reviewType === "tracks"
                                ? "tracks"
                                : "classics"
                        }/${r.slug.current}`}
                        key={i}
                    >
                        <ReviewCard post={r} />
                    </Link>
                ))}
            </section>
        </main>
    );
}
