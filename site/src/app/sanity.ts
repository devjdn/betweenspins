import {
    Review,
    ReviewWithMetadata,
    Thought,
    ThoughtWithMetadata,
    Author,
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

/* For Reviews */

export async function reviewPostCount() {
    const query = `
    {
      "reviews": count(*[_type == "reviews"])
    }
  `;

    const counts: { reviews: number } = await sanity.fetch(query);
    return counts.reviews;
}

export async function getReviewsInRange(start: number, end: number) {
    const posts: ReviewWithMetadata[] = await sanity.fetch(
        `*[_type == "reviews"]|order(_updatedAt asc)[${start}...${end}]{
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

export async function getAllFromReviewType(
    type: Review["reviewType"]
): Promise<Array<Review>> {
    const query = `*[_type == "reviews" && reviewType == $type]|order(publishedAt desc) {
        ...
    }`;
    const reviews = await sanity.fetch(query, { type });
    return reviews;
}

export async function getAllClassicReviews(): Promise<Array<Review>> {
    const query = `*[_type == "reviews" && isClassic == true]|order(publishedAt desc) {
        ...,
        author->{
            ...
        }
    }`;
    const reviews = await sanity.fetch(query);
    return reviews;
}

export async function getAllReviews(): Promise<Array<Review>> {
    const query = `
        *[_type == "reviews"]|order(publishedAt desc)[0...9]{
            ...,
            author->{
                ...
            }
        }
    `;

    const reviews = await sanity.fetch(query);
    return reviews;
}

export async function getAllReviewSlugs(): Promise<
    Array<{ type: string; slug: string }>
> {
    const query = `
        *[_type == "reviews" && defined(slug.current)] {
            "slug": slug.current,
            "type": reviewType
        }
    `;

    const reviews = await sanity.fetch(query);
    return reviews;
}

export async function getReviewForPage(slug: string): Promise<Review | null> {
    const query = `*[_type == "reviews" && slug.current == $slug][0] {
        ...,
        author->{
            ...
        }
    }`;
    const review = await sanity.fetch(query, { slug });
    return review ?? null;
}

export async function getRelatedReviews(
    currentSlug: string,
    reviewType: "albums" | "tracks",
    limit: number = 3
): Promise<Array<Review>> {
    const query = `
    *[_type == "reviews" && slug.current != $currentSlug && reviewType == $reviewType] 
    | order(publishedAt desc)[0...$limit] {
        ...,
        author->{
            ...
        }
    }
    `;

    try {
        const data = await sanity.fetch(query, {
            currentSlug,
            reviewType,
            limit,
        });
        return data;
    } catch (error) {
        console.error("Error fetching related reviews from Sanity:", error);
        return [];
    }
}

/* For Thoughts */

export async function getAllThoughts(): Promise<Array<Thought>> {
    const query = `
        *[_type == "thought"]|order(publishedAt desc)[0...9]{
            ...,
            author->{
                ...
            }
        }
    `;

    const thoughts = await sanity.fetch(query);
    return thoughts;
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

/* For Authors */

export async function getAllAuthorSlugs(): Promise<Array<{ slug: string }>> {
    const query = `
        *[_type == "author" && defined(slug.current)] {
            "slug": slug.current
        }
    `;

    const authors = await sanity.fetch(query);
    return authors;
}

export async function getAllAuthors(): Promise<Array<Author>> {
    const query = `*[_type == "author"] {
        ...
    }`;
    const authors = await sanity.fetch(query);
    return authors;
}

export async function authorForPage(slug: string): Promise<Author | null> {
    const query = `*[_type == "author" && slug.current == $slug][0] {
      ...,
      }
    `;
    const author = await sanity.fetch(query, { slug });
    return author ?? null;
}

export async function getAuthorPostCount(slug: string): Promise<number> {
    const query = `
    {
      "albums": count(*[_type == "albums" && author->slug.current == $slug]),
      "tracks": count(*[_type == "tracks" && author->slug.current == $slug]),
      "thoughts": count(*[_type == "thought" && author->slug.current == $slug])
    }
    `;

    const counts: { albums: number; tracks: number; thoughts: number } =
        await sanity.fetch(query, { slug });
    return counts.albums + counts.tracks + counts.thoughts;
}

export async function getAllAuthorReviews(
    authorSlug: string
): Promise<Array<ReviewWithMetadata>> {
    const query = `
        *[_type == "reviews" && author->slug.current == $authorSlug] 
        | order(publishedAt desc) {
            ...,
            author->{
                ...
            }
        }
    `;

    try {
        const reviews = await sanity.fetch(query, { authorSlug });
        return reviews;
    } catch (error) {
        console.error("Error fetching all author reviews from Sanity:", error);
        return [];
    }
}

export async function getAllAuthorThoughts(
    authorSlug: string
): Promise<Array<ThoughtWithMetadata>> {
    const query = `*[_type == "thought" && author->slug.current == $authorSlug] | order(publishedAt desc) {
            ...,
            author->{
                ...
            }
        }
    `;

    try {
        const thoughts = await sanity.fetch(query, { authorSlug });
        return thoughts;
    } catch (error) {
        console.error("Error fetching all author thoughts from Sanity:", error);
        return [];
    }
}
