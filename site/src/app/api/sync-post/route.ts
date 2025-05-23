import { insertEntryOnPostCreation } from "../../../../convex/post_likes";
import { api } from "../../../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

export async function POST(req: Request) {
    const secret = req.headers.get("x-webhook-token");
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const slug = body?.slug?.current;
    if (!slug) {
        return new Response("Missing slug", { status: 400 });
    }

    try {
        await fetchMutation(api.post_likes.insertEntryOnPostCreation, { slug });
        return new Response("OK");
    } catch (err) {
        console.error("Error syncing post:", err);
        return new Response("Error", { status: 500 });
    }
}
