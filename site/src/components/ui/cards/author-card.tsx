import { formatDate } from "@/lib/formatDate";
import { urlForImage } from "@/lib/sanity/image";
import { Author } from "@/types/sanity";
import { Disc3 } from "lucide-react";
import Image from "next/image";

export default function AuthorCard({ author }: { author: Author }) {
    return (
        <div className="space-y-4 text-center group">
            <div className="relative aspect-square mb-2 bg-muted rounded-full overflow-hidden group-hover:shadow-md transition-shadow duration-300">
                {author.image ? (
                    <Image
                        src={urlForImage(author.image)}
                        alt={author.name}
                        width={400}
                        height={400}
                        className="object-cover duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Disc3 className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div className="line-clamp-2 space-y-2">
                <h3 className="font-serif text-xl leading-tight tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {author.name}
                </h3>
                <p className="text-muted-foreground leading-tight text-sm">
                    {formatDate(author._createdAt)}
                </p>
            </div>
        </div>
    );
}
