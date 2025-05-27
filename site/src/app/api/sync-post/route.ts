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
    const operation = req.headers.get("sanity-operation");
    const docId = body?._id;

    console.log("Webhook body:", body);
    console.log(operation);

    if (!slug) {
        return new Response("Missing slug", { status: 400 });
    }

    if (docId?.startsWith("drafts.")) {
        console.log("Ignoring draft event.");
        return new Response("Ignored draft event", { status: 200 });
    }

    try {
        if (operation === "create") {
            await fetchMutation(api.post_likes.insertEntryOnPostCreation, {
                slug,
            });
        } else if (operation === "delete") {
            await fetchMutation(api.post_likes.removeDeletedPostFromConvex, {
                slug,
            });
        } else if (operation === "update") {
            console.log("Update operation received — no action taken");
            return new Response("Update ignored", { status: 200 });
        } else {
            console.log("Unknown operation:", operation);
        }
        return new Response("OK");
    } catch (err) {
        console.error("Error syncing post:", err);
        return new Response("Error", { status: 500 });
    }
}
