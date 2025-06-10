import { urlForImage } from "@/lib/sanity/image";
import { Author } from "@/types/sanity";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import PTComponent from "../post/portable-text";
import { Badge } from "../badge";

export default async function AuthorHeader({ ...props }: Author) {
    return (
        <header className="flex flex-col items-center justify-center gap-8">
            {props.image && (
                <div className="w-2xs rounded-full overflow-hidden">
                    <Image
                        className="aspect-square w-full object-cover object-center shadow-lg "
                        height={400}
                        width={400}
                        priority
                        src={urlForImage(props.image)}
                        alt={`${props.name}'s Author Picture`}
                    />
                </div>
            )}
            <div className="space-y-2 flex flex-col items-center">
                <Badge variant={"post"}>Author</Badge>

                <h1 className="font-serif text-center text-3xl md:text-4xl tracking-tight">
                    {props.name}
                </h1>
            </div>
            <div className="rounded-md bg-muted p-4 text-center">
                <h2 className="font-serif text-2xl mb-4">About</h2>
                {props.bio && (
                    <p className="text-muted-foreground text-base">
                        {props.bio}
                    </p>
                )}
            </div>
        </header>
    );
}
