import { formatDate } from "@/lib/formatDate";
import { urlForImage } from "@/lib/sanity/image";
import { Review } from "@/types/sanity";
import { ListMusic, PencilLine, CalendarRange } from "lucide-react";
import { Badge } from "../badge";
import Rating from "./rating";
import Image from "next/image";
import Link from "next/link";

type ReviewHeaderProps = Omit<
    Review,
    "_id" | "slug" | "categories" | "body"
> & {
    reviewType: string;
};

export default function ReviewHeader({
    title,
    artist,
    releaseDate,
    publishedAt,
    genre,
    rating,
    author,
    description,
    mainImage,
    reviewType,
    isClassic,
}: ReviewHeaderProps) {
    return (
        <header className="flex flex-col gap-8">
            <div className="flex flex-col-reverse md:flex-row md:items-end gap-8">
                {mainImage && (
                    <div className="w-full md:w-1/3 space-y-4">
                        <Image
                            className="aspect-square w-full object-cover object-center shadow-lg rounded-sm"
                            height={400}
                            width={400}
                            priority
                            src={urlForImage(mainImage)}
                            alt="Cover photo"
                        />
                        <Rating rating={rating} />
                    </div>
                )}
                <div className="w-full md:w-2/3 space-y-4">
                    <Badge className="mx-auto" variant={"post"}>
                        {reviewType === "albums" ? "Album" : "Track"}
                    </Badge>
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">
                            {title}
                        </h1>
                        <h2 className="text-xl md:text-2xl text-muted-foreground tracking-tight">
                            {artist}
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <ListMusic className="w-4 h-4" />
                            <span>Released in {releaseDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PencilLine className="w-4 h-4" />
                            <span>
                                By{" "}
                                <Link href={`/authors/${author.slug.current}`}>
                                    <span className="font-medium text-foreground">
                                        {author.name}
                                    </span>
                                </Link>
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarRange className="w-4 h-4" />
                            <span>Published on {formatDate(publishedAt)}</span>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2">
                        {isClassic && (
                            <Badge variant={"classic"}>Classic</Badge>
                        )}
                        <Badge variant={"default"}>{genre}</Badge>
                    </div>
                </div>
            </div>
            <div className="rounded-md bg-muted p-4">
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
        </header>
    );
}
