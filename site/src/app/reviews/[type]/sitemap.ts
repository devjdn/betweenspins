import { getReviewsInRange, reviewPostCount } from "@/app/sanity";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
    const count = await reviewPostCount();

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
    const posts = await getReviewsInRange(start, end);

    return posts.map((post) => ({
        url: `https://www.betweenspins.com/reviews/${post.type}/${post.slug}`,
        lastModified: post.updatedAt,
    }));
}
