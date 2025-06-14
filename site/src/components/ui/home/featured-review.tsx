import type { Review } from "@/types/sanity";
import { urlForImage } from "@/lib/sanity/image";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListMusic, CalendarRange, Star, ArrowRight } from "lucide-react";

export default async function FeaturedReview({ review }: { review: Review }) {
    const backgroundImage = review.mainImage
        ? urlForImage(review.mainImage)
        : null;

    return (
        <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
            {/* Background Image */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            {/* Content */}
            <div className="container mx-auto px-4 h-full relative z-10">
                <div className="flex flex-col md:flex-row h-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] items-center gap-8 py-12">
                    {/* Album/Track Cover */}
                    <div className="w-full md:w-2/5 lg:w-1/3 flex justify-center md:justify-end">
                        <div className="relative group">
                            {review.mainImage ? (
                                <img
                                    src={backgroundImage || "/placeholder.svg"}
                                    alt={review.title}
                                    className="aspect-square object-cover rounded-md shadow-2xl w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px]"
                                />
                            ) : (
                                <div className="aspect-square bg-muted rounded-md shadow-2xl w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px]"></div>
                            )}

                            {/* Rating Badge */}
                            {review.rating && (
                                <div className="absolute -top-3 -right-3">
                                    <Badge className="bg-black text-white px-3 py-1 text-lg font-bold shadow-lg">
                                        <Star className="h-4 w-4 mr-1 fill-current" />
                                        {review.rating}
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left space-y-6">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {review.isClassic && (
                                <Badge
                                    variant="outline"
                                    className="text-xs font-serif border-yellow-400 text-yellow-400"
                                >
                                    Classic
                                </Badge>
                            )}
                            <Badge className="text-xs capitalize bg-black text-white">
                                Featured {review.reviewType} Review
                            </Badge>
                            <Badge className="text-xs capitalize bg-black text-white">
                                {review.genre}
                            </Badge>
                        </div>

                        {/* Title and Artist */}
                        <div className="">
                            <h1 className="text-4xl xl:text-5xl font-serif text-white tracking-tight leading-tight">
                                {review.title}
                            </h1>
                            <h2 className="text-xl xl:text-2xl text-white/90 tracking-tight">
                                {review.artist}
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-white/80 max-w-2xl text-sm leading-relaxed">
                            {review.description}
                        </p>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start text-white/70 text-sm">
                            <div className="flex items-center gap-1">
                                <ListMusic className="h-4 w-4" />
                                <span>Released in {review.releaseDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarRange className="h-4 w-4" />
                                <span>
                                    Reviewed {formatDate(review.publishedAt)}
                                </span>
                            </div>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="bg-black text-white group hover:bg-neutral-950 transition-colors duration-200"
                        >
                            <Link
                                href={`/reviews/${review.reviewType}s/${review.slug.current}`}
                            >
                                <p>Read Full Review</p>
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
