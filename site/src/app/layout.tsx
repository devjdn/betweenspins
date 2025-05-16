import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const instrument = Instrument_Serif({
    style: "normal",
    weight: "400",
    subsets: ["latin"],
    variable: "--font-serif",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Between Spins",
    description:
        "Between Spins is a music blog where I discuss some of my favourite I've heard throughout my life — as well any other music that's suggested to me. In all honesty, I wanted to create a place where I can discuss music without having to be an expert to participate.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${instrument.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-cover bg-fixed bg-blend-normal flex flex-col`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <main className="grow">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
