export const ASCENDING = "asc";
export const DESCENDING = "desc";
export type Order = typeof ASCENDING | typeof DESCENDING;
export type OrderBy<T> = Record<keyof T, Order | undefined>;
