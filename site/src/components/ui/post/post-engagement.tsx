import { Separator } from "../separator";
import CommentSection from "./engagement/comment-section";
import EngagementStats from "./engagement/engagement-stats";

export type EngagementProps = {
    slug: string;
    comment_count: number;
};

export default function PostEngagement({ ...props }: EngagementProps) {
    return (
        <div className="space-y-4">
            <EngagementStats
                slug={props.slug}
                comment_count={props.comment_count ?? 0}
            />

            <Separator orientation="horizontal" />

            <CommentSection />
        </div>
    );
}
