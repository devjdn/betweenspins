import ReviewCard from "@/components/ui/cards/review-card";
import { getAllReviews } from "../sanity";
import Link from "next/link";

export default async function AllReviewsPage() {
    const reviews = await getAllReviews();

    return (
        <main className="container mx-auto space-y-8 px-4 py-16">
            <header>
                <h1 className="font-serif tracking-tight text-3xl md:text-4xl">
                    Reviews
                </h1>
            </header>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8">
                {reviews.map((r, i) => (
                    <Link
                        href={`/reviews/${
                            r.reviewType === "album" ? "albums" : "tracks"
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
