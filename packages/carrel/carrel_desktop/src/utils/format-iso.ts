import { formatISO } from "date-fns"

export const formatIso = (dateTime: Date): string => {
    return formatISO(dateTime)
}

export const getNowISO = (): string => {
    return formatIso(new Date())
}
