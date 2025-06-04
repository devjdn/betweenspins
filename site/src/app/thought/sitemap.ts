import { getThoughtsInRange, thoughtPostCount } from "@/app/sanity";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
    const count = await thoughtPostCount();

    const maxSitemaps = 50000;
    const numberOfSitemapFiles = Math.ceil(count / maxSitemaps);

    return Array.from({ length: numberOfSitemapFiles }, (_, i) => ({ id: i }));
}

export default async function sitemap({
    id,
}: {
    id: number;
}): Promise<MetadataRoute.Sitemap> {
    const start = id * 50000;
    const end = start + 50000;
    const posts = await getThoughtsInRange(start, end);

    return posts.map((post) => ({
        url: `https://www.betweenspins.com/${post.type}/${post.slug}`,
        lastModified: post.updatedAt,
    }));
}
