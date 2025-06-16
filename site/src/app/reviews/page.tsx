import ReviewCard from "@/components/ui/cards/review-card";
import { getAllReviews } from "../sanity";
import Link from "next/link";
import ReviewsNav from "@/components/ui/review/nav";

export default async function AllReviewsPage() {
    const reviews = await getAllReviews();

    return (
        <main className="container mx-auto space-y-8 px-4 py-16">
            <header className="space-y-4">
                <h1 className="font-serif tracking-tight text-3xl md:text-4xl">
                    Reviews
                </h1>
                <ReviewsNav />
            </header>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8">
                {reviews.map((r, i) => (
                    <Link
                        href={`/reviews/${
                            r.reviewType === "albums" ? "albums" : "tracks"
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
