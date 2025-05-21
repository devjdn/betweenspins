import { SanityImage } from "@/types/sanity";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { urlForImage } from "@/lib/sanity/image";

export default function AuthoredBy({
    name,
    image,
}: {
    name: string;
    image?: SanityImage;
}) {
    return (
        <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-1">
                <Avatar>
                    <AvatarImage src={image && urlForImage(image)} />
                    <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <p>{name}</p>
            </div>
        </div>
    );
}
