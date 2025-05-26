import clsx from "clsx";

export default function Rating({ rating }: { rating?: number }) {
    if (rating !== undefined)
        return (
            <div className="space-y-2 md:mx-auto text-center">
                <div
                    className={clsx(
                        "h-2 w-full rounded-full",
                        { "bg-red-300 dark:bg-red-950": rating < 50 },
                        { "bg-green-300 dark:bg-green-950": rating >= 75 },
                        {
                            "bg-yellow-300 dark:bg-yellow-950":
                                rating >= 50 && rating < 75,
                        }
                    )}
                >
                    <div
                        className={clsx(
                            "h-2 rounded-full",
                            { "bg-red-500 dark:bg-red-700": rating < 50 },
                            { "bg-green-500 dark:bg-green-700": rating >= 75 },
                            {
                                "bg-yellow-500 dark:bg-yellow-700":
                                    rating >= 50 && rating < 75,
                            }
                        )}
                        style={{ width: `${rating}%` }}
                    ></div>
                </div>
                <div>
                    <p
                        className={clsx(
                            "font-semibold text-xl md:text-2xl",
                            { "text-red-500 dark:text-red-400": rating < 50 },
                            {
                                "text-green-500 dark:text-green-400":
                                    rating >= 75,
                            },
                            {
                                "text-yellow-500 dark:text-yellow-400":
                                    rating >= 50 && rating < 75,
                            }
                        )}
                    >
                        {rating}/100
                    </p>
                </div>
            </div>
        );
}
