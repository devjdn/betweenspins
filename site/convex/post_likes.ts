import { query, mutation } from "./_generated/server";
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

export const likePost = mutation({
    args: {
        clerkUserId: v.string(),
        slug: v.string(),
    },
    handler: async (ctx, { clerkUserId, slug }) => {
        const postLikes = await ctx.db
            .query("post_likes")
            .filter((q) => q.eq(q.field("slug"), slug))
            .first();

        if (!postLikes) {
            console.warn(
                `The post with the ${slug} was not found in the "post_likes" table.`
            );

            return null;
        }

        const existingLike = await ctx.db
            .query("users_post_likes")
            .filter((q) =>
                q.and(
                    q.eq(q.field("clerkUserId"), clerkUserId),
                    q.eq(q.field("postId"), postLikes._id)
                )
            )
            .first();

        if (existingLike) {
            console.log(`${clerkUserId} has already liked post ${slug}.`);

            return "Already liked";
        }

        await ctx.db.patch(postLikes._id, {
            like_count: postLikes.like_count + 1,
        });

        await ctx.db.insert("users_post_likes", {
            postId: postLikes._id,
            clerkUserId: clerkUserId,
        });

        return "Liked Post";
    },
});

export const unlikePost = mutation({
    args: {
        slug: v.string(),
        clerkUserId: v.string(),
    },
    handler: async (ctx, { slug, clerkUserId }) => {
        const postLikes = await ctx.db
            .query("post_likes")
            .filter((q) => q.eq(q.field("slug"), slug))
            .first();

        if (!postLikes) {
            console.warn(
                `The post with the ${slug} was not found in the "post_likes" table.`
            );

            return null;
        }

        const likeToDelete = await ctx.db
            .query("users_post_likes")
            .filter((q) =>
                q.and(
                    q.eq(q.field("clerkUserId"), clerkUserId),
                    q.eq(q.field("postId"), postLikes._id)
                )
            )
            .first();

        if (!likeToDelete) {
            console.log(`${clerkUserId} has not liked post ${slug}.`);

            return "Not liked";
        }

        await ctx.db.patch(postLikes._id, {
            like_count: Math.max(0, postLikes.like_count - 1),
        });

        await ctx.db.delete(likeToDelete._id);

        return "Unliked post";
    },
});

export const hasUserLikedPost = query({
    args: {
        slug: v.string(),
        clerkUserId: v.string(),
    },
    handler: async (ctx, { slug, clerkUserId }) => {
        if (!clerkUserId) {
            return false;
        }

        const postLikes = await ctx.db
            .query("post_likes")
            .filter((q) => q.eq(q.field("slug"), slug))
            .first();

        if (!postLikes) {
            return false;
        }

        const existingUserLike = await ctx.db
            .query("users_post_likes")
            .filter((q) =>
                q.and(
                    q.eq(q.field("clerkUserId"), clerkUserId),
                    q.eq(q.field("postId"), postLikes._id)
                )
            )
            .first();

        return !!existingUserLike;
    },
});
