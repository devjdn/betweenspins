import { api } from "../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export async function getPostLikes(slug: string) {
    try {
        const postLikes = await fetchQuery(api.post_likes.getLikesForPost, {
            slug,
        });
        return postLikes?.like_count ?? 0;
    } catch (error) {
        console.error("Error fetching post likes:", error);
        return 0;
    }
}
