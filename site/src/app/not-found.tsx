"use client";

import { Disc3, Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    {/* Animated Disc Icon */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <Disc3
                            size={120}
                            strokeWidth={0.5}
                            className="animate-spin stroke-muted-foreground mx-auto relative z-10"
                            style={{
                                animationDuration: "3s",
                                animationTimingFunction: "linear",
                            }}
                        />
                        {/* Center dot */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-muted-foreground rounded-full z-20" />
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-bold text-primary tracking-tight">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-serif">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            The page you&apos;re looking for doesn&apos;t seem
                            to exist. Feel free to explore some of the provided
                            options below.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild size="lg" className="min-w-[140px]">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Go Home
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="min-w-[140px]"
                        >
                            <Link href="/search">
                                <Search className="mr-2 h-4 w-4" />
                                Search Music
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => window.history.back()}
                            className="min-w-[140px]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </div>

                    {/* Popular Links */}
                    <div className="pt-8 border-t border-border">
                        <h3 className="font-serif text-lg mb-4">
                            Popular Sections
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <Link
                                href="/reviews/albums"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Album Reviews
                            </Link>
                            <span className="text-muted-foreground">•</span>
                            <Link
                                href="/reviews/tracks"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Track Reviews
                            </Link>
                            <span className="text-muted-foreground">•</span>
                            <Link
                                href="/thoughts"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Music Thoughts
                            </Link>
                            <span className="text-muted-foreground">•</span>
                            <Link
                                href="/artists"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Featured Artists
                            </Link>
                        </div>
                    </div>

                    {/* Fun Music Quote */}
                    <div className="pt-4">
                        <blockquote className="text-sm text-muted-foreground italic">
                            &quot;Music is the soundtrack of your life.&quot;{" "}
                            <br />
                            <span className="text-xs">— Dick Clark</span>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-muted-foreground/10 rounded-full animate-pulse" />
                <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-muted-foreground/10 rounded-full animate-pulse delay-1000" />
                <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-muted-foreground/10 rounded-full animate-pulse delay-500" />
            </div>
        </div>
    );
}
