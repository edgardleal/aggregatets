/**
 * export-database-data.ts
 *
 * SDG
 */

import jp from 'jsonpath'
import AggregateStep from '../aggregate-step'
import CompiledStep from '../compiled-step'
import { eq } from '../func/eq'
import { QueryFunction } from '../func/query-function'
import QueryStep from '../query-step'


export function generateEqualForValue<T>(field: string, value: unknown) {
  let b = (_data: T) => value
  if (typeof value === 'string' && value.startsWith('$')) {
    b = (data: T) => jp.query(data, value.replace('$', '$.'))[0] as unknown
  }
  return eq((data: T) => jp.query(data, `$.${field}`)[0], b)
}

/**
 * MatchStep
 * 
 **/
export default class MatchStep<T = unknown> implements AggregateStep<T> {

  constructor(private query: QueryStep<T>) { }

  async compile(): Promise<CompiledStep<T[]>> {
    const queryFields = Object.keys(this.query)
    const parsedQueryFields = queryFields.map((field: string) => {
      return generateEqualForValue(field, this.query[field])
    })
    return {
      filter: (data: T): boolean => parsedQueryFields.reduce((prev: boolean, act: QueryFunction<T, boolean>) => act(data) && prev, true)
    }
  }
}
