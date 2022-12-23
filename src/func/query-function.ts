/**
 * export-database-data.ts
 *
 * 
 *
 * All rights reserved. Do not distribute.
 * SDG
 */

export type QueryFunction<T = unknown, R = unknown> = (data: T, index?: number, list?: T[]) => R;
