/**
 * export-database-data.ts
 *
 * SDG
 */

import jp from 'jsonpath'
import normalizeJsonPath from '../path/normalize-jsonp'
import { QueryFunction } from './query-function'

/**
 * eq
 **/
export function eq<T = unknown>(a: QueryFunction, b: QueryFunction): QueryFunction<T> {
  return (data: T, index: number, list: T[]) => (a(data, index, list) === b(data, index, list))
}

/**
 * generateEqualForFields
 **/
export function generateEqualForFields<T = unknown>(a: string, b: string): QueryFunction<T> {
  const aFunc = (data: T) => jp.query(data, normalizeJsonPath(a))[0] as unknown
  const  bFunc = (data: T) => jp.query(data, normalizeJsonPath(b))[0] as unknown

  return eq<T>(aFunc, bFunc)
}
