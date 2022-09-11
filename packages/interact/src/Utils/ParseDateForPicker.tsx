import {format, parseISO} from "date-fns";

/**
 * Utility class to parse either Date or ISO string to Date object and feed to {@link InteractDatePicker}
 * @param end
 */
export function parseDateForPicker(end: unknown | null) {
    if (!end) {
        return null
    }
    // if it's a string, parse it
    if (typeof end === 'string') {
        return parseISO(end)
    }

    // if it's Date
    if (end instanceof Date) {
        return end
    }
    return null;
}

export function parseDateTime(input: unknown | null) {
    const date = parseDateForPicker(input);
    if (!date) {
        return null;
    }
    return format(date, 'yyyy-MM-dd p');
}
