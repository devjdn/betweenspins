"use client";

import * as React from "react";
import { Button } from "../button";
import { Heart } from "lucide-react";

export default function LikeButton({ slug }: { slug: string }) {
    return (
        <Button className="w-fit" variant={"ghost"}>
            <Heart className="size-4" />
            <p>Like the post</p>
        </Button>
    );
}
