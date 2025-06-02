"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { EngagementProps } from "../post-engagement";
import LikeBtn from "./like-btn";

export default function EngagementStats({ ...props }: EngagementProps) {
    return (
        <div className="flex items-center gap-4">
            <LikeBtn {...props} />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="size-4" />
                <p>{props.comment_count ?? 0}</p>
            </div>
        </div>
    );
}
