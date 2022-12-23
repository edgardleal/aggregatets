/**
 * export-database-data.ts
 *
 * 
 *
 * All rights reserved. Do not distribute.
 * SDG
 */

import { QueryFunction } from './query-function'

/**
 * eq
 **/
export function eq<T = unknown>(a: QueryFunction, b: QueryFunction): QueryFunction<T> {
  return (data: T, index: number, list: T[]) => (a(data, index, list) === b(data, index, list))
}
