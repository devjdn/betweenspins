import { Disc3 } from "lucide-react";

export default function NotFound() {
    return (
        <div className="h-full grid place-items-center">
            <Disc3
                size={72}
                strokeWidth={0.75}
                className="animate-spin stroke-muted-foreground"
            />
        </div>
    );
}
