"use client";

import { Heart } from "lucide-react";
import { Button } from "../../button";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import * as React from "react";
import clsx from "clsx";

export default function LikeBtn({ slug }: { slug: string }) {
    const { userId, isSignedIn, isLoaded } = useAuth();

    const hasLiked = useQuery(api.post_likes.hasUserLikedPost, {
        slug: slug,
        clerkUserId: userId || "",
    });

    const totalLikes = useQuery(api.post_likes.getLikesForPost, {
        slug: slug,
    });

    const likePost = useMutation(api.post_likes.likePost);
    const unlikePost = useMutation(api.post_likes.unlikePost);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleLike = async () => {
        if (!isSignedIn || !userId) {
            // I need to implement an actual sign in page and have this redirect
            alert("Please sign in to like a post.");
            return;
        }

        setIsLoading(true);

        try {
            if (hasLiked) {
                await unlikePost({ slug: slug, clerkUserId: userId });
                console.log("Post unliked");
            } else {
                await likePost({ slug: slug, clerkUserId: userId });
                console.log("Post liked");
            }
        } catch (error) {
            console.error("Error liking/unliking post:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoaded || hasLiked === undefined) {
        return (
            <div className="flex items-center space-x-2">
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-not-allowed"
                    disabled
                >
                    Loading...
                </button>
                <span className="text-gray-600">Loading likes...</span>
            </div>
        );
    }

    return (
        <Button
            size={"sm"}
            variant={"outline"}
            onClick={handleLike}
            disabled={isLoading || !isSignedIn}
        >
            <Heart
                className={clsx(
                    "size-4",
                    { "stroke-none fill-red-400": hasLiked },
                    { "cursor-not-allowed opacity-50": !isSignedIn },
                    { "cursor-wait opacity-70": isLoading }
                )}
            />
            <p className="tabular-nums">{totalLikes?.like_count ?? 0}</p>
        </Button>
    );
}
