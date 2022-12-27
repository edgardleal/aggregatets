/**
 * export-database-data.ts
 *
 * SDG
 */

export type QueryFunction<T = unknown, R = unknown> = (data: T, index?: number, list?: T[]) => R;
