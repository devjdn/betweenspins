import imageUrlBuilder from "@sanity/image-url";
import { sanity } from "@/app/sanity";
import { SanityImage } from "@/types/sanity";

const builder = imageUrlBuilder(sanity);

export function urlForImage(source: SanityImage) {
    return builder.image(source).url();
}
