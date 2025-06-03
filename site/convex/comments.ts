import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCommentsForPost = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const comments = await ctx.db
            .query("comments")
            .filter((q) => q.eq(q.field("slug"), args.slug))
            .collect();

        return comments;
    },
});

export const addComment = mutation({
    args: {
        slug: v.string(),
        postId: v.id("post_likes"),
        clerkUserId: v.string(),
        userName: v.string(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("comments", args);
    },
});
