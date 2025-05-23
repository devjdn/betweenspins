import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Other tables here...

    post_likes: defineTable({
        like_count: v.float64(),
        slug: v.string(),
    }),
});
