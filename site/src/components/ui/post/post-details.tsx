import { formatDate } from "@/lib/formatDate";
import { Album, BaseMusicContent } from "@/types/sanity";

export default function PostDetails({
    publishedAt,
    author,
    releaseDate,
    genre,
}: Album) {
    return (
        <div className="space-x-8">
            <p>{formatDate(publishedAt)}</p>
            <p>{author.name}</p>
            <p>{genre}</p>
            <p>{releaseDate}</p>
        </div>
    );
}
