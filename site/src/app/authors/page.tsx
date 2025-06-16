import AuthorCard from "@/components/ui/cards/author-card";
import { getAllAuthors } from "../sanity";
import Link from "next/link";

export default async function AllAuthorsPage() {
    const authors = await getAllAuthors();

    return (
        <main className="container mx-auto space-y-8 px-4 py-16">
            <header>
                <h1 className="font-serif tracking-tight text-3xl md:text-4xl">
                    Authors
                </h1>
            </header>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8">
                {authors.map((author, i) => (
                    <Link key={i} href={`/authors/${author.slug.current}`}>
                        <AuthorCard author={author} />
                    </Link>
                ))}
            </section>
        </main>
    );
}
