import { format } from "../../deps.ts";

export const toDate = (timestampSecond: number): Date => {
    return new Date(timestampSecond * 1000)
}

export const parseFormat = (date: Date): string => {
    return format(date, "yyyy-MM-dd HH:mm:ss.SSS")
}
