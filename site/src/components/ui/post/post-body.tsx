import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface PostBodyProps {
    content: PortableTextBlock[];
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => (
            <img
                src={value.asset?.url}
                alt={value.alt || "Image"}
                className="rounded-md my-4"
            />
        ),
        code: ({ value }) => (
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{value.code}</code>
            </pre>
        ),
        embed: ({ value }) => (
            <iframe
                src={value.url}
                style={{
                    width: "100%",
                    height: "450px",
                    border: "none",
                    borderRadius: 0,
                }}
                allow="autoplay *; encrypted-media *;"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
            />
        ),
        // Add other custom types if needed
    },
    marks: {
        em: ({ children }) => <em className="italic">{children}</em>,
        strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
        ),
        code: ({ children }) => (
            <code className="bg-gray-200 px-1 py-0.5 rounded">{children}</code>
        ),
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
            >
                {children}
            </a>
        ),
    },
    block: {
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold my-4">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-3xl font-semibold my-3">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl font-medium my-2">{children}</h3>
        ),
        normal: ({ children }) => (
            <p className="my-4 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc ml-6 my-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal ml-6 my-2">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="mb-1">{children}</li>,
        number: ({ children }) => <li className="mb-1">{children}</li>,
    },
};

export default function PostBody({ content }: PostBodyProps) {
    return (
        <div>
            <PortableText value={content} components={components} />
        </div>
    );
}
