import { query, mutation } from "./_generated/server";
// import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const getLikesForPost = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const post = await ctx.db
            .query("post_likes")
            .filter((q) => q.eq(q.field("slug"), args.slug))
            .first();
        return post;
    },
});

export const insertEntryOnPostCreation = mutation({
    args: { slug: v.string() },
    handler: async (ctx, { slug }) => {
        const allLikes = await ctx.db.query("post_likes").collect();

        const exists = allLikes.find((like) => like.slug === slug);

        if (!exists) {
            await ctx.db.insert("post_likes", { slug, like_count: 0 });
        }
    },
});

export const removeDeletedPostFromConvex = mutation({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const slug = await ctx.db
            .query("post_likes")
            .filter((q) => q.eq(q.field("slug"), args.slug))
            .first();

        if (slug) {
            await ctx.db.delete(slug._id);
        }
    },
});
