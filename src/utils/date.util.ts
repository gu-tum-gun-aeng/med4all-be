import { format } from "../../deps.ts";

export const toDate = (timestampSecond: number): Date => {
    return new Date(timestampSecond * 1000)
}
