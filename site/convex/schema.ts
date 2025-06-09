import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    post_likes: defineTable({
        like_count: v.float64(),
        slug: v.string(),
    }).index("by_slug", ["slug"]),

    users_post_likes: defineTable({
        postId: v.id("post_likes"),
        clerkUserId: v.string(),
    }).index("by_user_and_post", ["clerkUserId", "postId"]),

    comments: defineTable({
        postId: v.id("post_likes"),
        clerkUserId: v.string(),
        userName: v.string(),
        content: v.string(),
    }).index("by_postId", ["postId"]),
});
