import type { Metadata } from "next";
import { Inter, DM_Serif_Text, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

const instrument = Instrument_Serif({
    style: "normal",
    weight: "400",
    subsets: ["latin"],
    variable: "--font-instrument-serif",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const dm_serif = DM_Serif_Text({
    subsets: ["latin"],
    variable: "--font-serif",
    weight: "400",
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
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={`${dm_serif.variable} ${instrument.variable} ${inter.variable} antialiased min-h-screen bg-cover bg-fixed bg-blend-normal flex flex-col`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        <main className="grow">
                            <ConvexClientProvider>
                                {children}
                            </ConvexClientProvider>
                        </main>
                        <Footer />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
