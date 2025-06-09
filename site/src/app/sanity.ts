import {
    Albums,
    AlbumsWithMetadata,
    BaseMusicContent,
    Tracks,
    TracksWithMetadata,
    Thought,
    ThoughtWithMetadata,
} from "@/types/sanity";
import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
    projectId: "5tasc9nv",
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2025-02-06", // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
    // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content, accessing drafts or using draft perspectives
};

export const sanity = createClient(config);

/* For sitemaps */

export async function reviewPostCount() {
    const query = `
    {
      "tracks": count(*[_type == "tracks"]),
      "albums": count(*[_type == "albums"])
    }
  `;

    const counts: { albums: number; tracks: number } = await sanity.fetch(
        query
    );

    return counts.albums + counts.tracks;
}

export async function thoughtPostCount() {
    const query = `
    {
      "thoughts": count(*[_type == "thought"]),
    }
  `;

    const counts: { thoughts: number } = await sanity.fetch(query);

    return counts.thoughts;
}

export async function getReviewsInRange(start: number, end: number) {
    const posts: TracksWithMetadata[] | AlbumsWithMetadata[] =
        await sanity.fetch(
            `*[_type in ["tracks", "albums"]]|order(_updatedAt desc)[${start}...${end}]{
          "slug": slug.current,
          "_updatedAt": _updatedAt,
          "_type": _type
        }`
        );

    return posts.map((p) => ({
        slug: p.slug,
        updatedAt: p._updatedAt,
        type: p._type,
    }));
}

export async function getThoughtsInRange(start: number, end: number) {
    const posts: ThoughtWithMetadata[] = await sanity.fetch(
        `*[_type == "thought"]|order(_updatedAt desc)[${start}...${end}]{
              "slug": slug.current,
              "_updatedAt": _updatedAt,
              "_type": _type
            }`
    );

    return posts.map((p) => ({
        slug: p.slug,
        updatedAt: p._updatedAt,
        type: p._type,
    }));
}

/* For home page */

export async function getFourLatestOfPostType(
    postType: string
): Promise<Albums[] | Tracks[] | Thought[]> {
    const query = `*[_type == $postType] | order(_createdAt desc)[0...4]`;
    const posts = await sanity.fetch(query, { postType });
    return posts;
}

/* For bulk fetching a post type */

export async function getAlbums(): Promise<Albums[]> {
    const albums = await sanity.fetch(
        '*[_type == "albums"] | order(_createdAt desc)'
    );
    return albums;
}

export async function getSingles(): Promise<Tracks[]> {
    const singles = await sanity.fetch(
        '*[_type == "tracks"] | order(_createdAt desc)'
    );
    return singles;
}

/* For ISR for post pages */

export async function getAllReviewSlugs(): Promise<
    Array<{ type: string; slug: string }>
> {
    const query = `
        *[_type in ["albums", "tracks"] && defined(slug.current)] {
            "slug": slug.current,
            "type": _type
        }
    `;

    const reviews = await sanity.fetch(query);
    return reviews;
}

export async function getAllThoughtSlugs(): Promise<
    Array<{ type: string; slug: string }>
> {
    const query = `
        *[_type == "thought" && defined(slug.current)] {
            "slug": slug.current,
            "type": _type
        }
    `;

    const thoughts = await sanity.fetch(query);
    return thoughts;
}

/* For review pages */

export async function getReviewForPage(
    type: string,
    slug: string
): Promise<Albums | Tracks | null> {
    if (type === "albums") {
        return await albumForPage(slug);
    } else if (type === "tracks") {
        return await singleForPage(slug);
    }
    return null;
}

export async function getRelatedPosts(
    type: string,
    currentSlug: string,
    limit: number = 3
): Promise<Array<BaseMusicContent | Thought>> {
    const query = `
    *[_type == $type && slug.current != $currentSlug] 
    | order(_createdAt desc)[0...$limit] {
      ...
    }
  `;

    try {
        const data = await sanity.fetch(query, {
            type,
            currentSlug,
            limit,
        });
        return data;
    } catch (error) {
        console.error("Error fetching related posts from Sanity:", error);
        return [];
    }
}

/* These are being used in the getReviewForPage function */

export async function albumForPage(slug: string): Promise<Albums | null> {
    const query = `*[_type == "albums" && slug.current == $slug][0] {
      ...,
      author->{
        ...
      }
    }`;
    const album = await sanity.fetch(query, { slug });
    return album ?? null;
}

export async function singleForPage(slug: string): Promise<Tracks | null> {
    const query = `*[_type == "tracks" && slug.current == $slug][0] {
      ...,
      author->{
        ...
      }
    }`;
    const single = await sanity.fetch(query, { slug });
    return single ?? null;
}

export async function thoughtForPage(slug: string): Promise<Thought | null> {
    const query = `*[_type == "thought" && slug.current == $slug][0] {
      ...,
      author->{
        ...
      }
    }`;
    const thought = await sanity.fetch(query, { slug });
    return thought ?? null;
}
