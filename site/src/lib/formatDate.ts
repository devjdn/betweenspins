import { format } from "date-fns";

export function formatDate(published: string) {
    const date = new Date(published);
    const formatted = format(date, "do MMMM yyyy");

    return formatted;
}
