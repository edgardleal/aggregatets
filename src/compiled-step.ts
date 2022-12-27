/**
 * export-database-data.ts
 *
 * All rights reserved. Do not distribute.
 * SDG
 */

export type MapFunction<T extends Array<unknown> = unknown[]> = (val: typeof list[number], index: number, list: T) => typeof list[number];
export type FilterFunction<T extends Array<unknown> = unknown[]> = (val: typeof list[number], index: number, list: T) => boolean;
export type ReduceFunction<R = unknown, T extends Array<unknown> = unknown[]> = (prev: R, current: typeof list[number], index: number, list: T) => R;

/**
 * CompiledStep
 * Used internally to map or reduce the data
 **/
export default interface CompiledStep<T extends Array<unknown> = unknown[], R = unknown> {
  getComputedResult?: () => T;
  forEach?: MapFunction<T>;
  filter?: FilterFunction<T>;
  map?: MapFunction<T>;
  reduce?: ReduceFunction<R, T>;
}

