import { formatDate } from "@/lib/formatDate";
import { urlForImage } from "@/lib/sanity/image";
import type { Review } from "@/types/sanity";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarRange, MusicIcon, Landmark } from "lucide-react";

export default function ReviewCard({ post }: { post: Review }) {
    return (
        <TooltipProvider>
            <article className="w-full group">
                <div className="relative aspect-square mb-2 bg-muted rounded-sm overflow-hidden group-hover:shadow-md transition-shadow duration-300">
                    {post.mainImage ? (
                        <Image
                            src={urlForImage(post.mainImage)}
                            alt={post.title}
                            width={400}
                            height={400}
                            className="object-cover duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <MusicIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}

                    {/* Classic Album Indicator */}
                    {post.isClassic && (
                        <div className="absolute top-2 right-2 z-10">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="bg-yellow-500 text-yellow-900 p-1.5 rounded-full shadow-lg hover:bg-yellow-400 transition-colors">
                                        <Landmark className="h-4 w-4" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Classic Album</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                    <div className="line-clamp-2">
                        <h3 className="font-serif text-xl tracking-tight leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground leading-tight text-sm">
                            {post.artist}
                        </p>
                    </div>

                    <div className="flex items-center flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className="capitalize font-medium"
                        >
                            {post.genre}
                        </Badge>
                        <Badge variant="outline" className="font-medium">
                            <CalendarRange className="h-3 w-3 mr-1" />
                            {formatDate(post.publishedAt)}
                        </Badge>
                    </div>
                </div>
            </article>
        </TooltipProvider>
    );
}
