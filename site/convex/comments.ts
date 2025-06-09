import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCommentsForPost = query({
    args: { postId: v.id("post_likes") },
    handler: async (ctx, args) => {
        const comments = await ctx.db
            .query("comments")
            .filter((q) => q.eq(q.field("postId"), args.postId))
            .collect();

        return comments;
    },
});

export const addComment = mutation({
    args: {
        postId: v.id("post_likes"),
        clerkUserId: v.string(),
        userName: v.string(),
        content: v.string(),
    },
    handler: async (ctx, { postId, clerkUserId, userName, content }) => {
        await ctx.db.insert("comments", {
            postId,
            clerkUserId,
            userName,
            content,
        });
    },
});
