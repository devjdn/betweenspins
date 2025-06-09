import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [thoughtSitemaps, combinedSitemaps] = await Promise.all([
        import("@/app/reviews/[type]/sitemap").then((mod) =>
            mod.generateSitemaps()
        ),
        import("./thought/sitemap").then((mod) => mod.generateSitemaps()),
    ]);

    const now = new Date().toISOString();

    return [
        {
            url: "https://betweenspins.com",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...thoughtSitemaps.map(({ id }) => ({
            url: `https://www.betweenspins.com/thought/sitemap/${id}.xml`,
            lastModified: now,
        })),

        ...combinedSitemaps.map(({ id }) => ({
            url: `https://www.betweenspins.com/reviews/album/sitemap/${id}.xml`,
            lastModified: now,
        })),
    ];
}
