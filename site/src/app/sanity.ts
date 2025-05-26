import { Album, Single } from "@/types/sanity";
import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
    projectId: "5tasc9nv",
    dataset: "production",
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: "2025-02-06", // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
    // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content, accessing drafts or using draft perspectives
};

export const sanity = createClient(config);

/* Not got a usage yet */

export async function getFiveLatestOfPostType(postType: string) {
    const query = `*[_type == $postType] | order(_createdAt desc)[0...5]`;
    const posts = await sanity.fetch(query, { postType });
    return posts;
}

/* For bulk fetching a post type */

export async function getAlbums() {
    const albums = await sanity.fetch(
        '*[_type == "album"] | order(_createdAt desc)'
    );
    return albums;
}

export async function getSingles() {
    const singles = await sanity.fetch(
        '*[_type == "single"] | order(_createdAt desc)'
    );
    return singles;
}

/* For ISR for post pages */

export async function getAllAlbumSlugs(): Promise<string[]> {
    const query = `*[_type == "album" && defined(slug.current)]{ "slug": slug.current }`;
    const posts = await sanity.fetch(query);
    return posts.map((post: { slug: string }) => post.slug);
}

export async function getAllSingleSlugs(): Promise<string[]> {
    const query = `*[_type == "single" && defined(slug.current)]{ "slug": slug.current }`;
    const posts = await sanity.fetch(query);
    return posts.map((post: { slug: string }) => post.slug);
}

/* For post pages */

export async function albumForPage(slug: string): Promise<Album | null> {
    const query = `*[_type == "album" && slug.current == $slug][0] {
      ...,
      author->{
        ...
      }
    }`;
    const album = await sanity.fetch(query, { slug });

    return album ?? null;
}

export async function singleForPage(slug: string): Promise<Single | null> {
    const query = `*[_type == "single" && slug.current == $slug][0] {
      ...,
      author->{
        ...
      }
    }`;
    const album = await sanity.fetch(query, { slug });

    return album ?? null;
}
