/**
 * export-database-data.ts
 *
 * SDG
 */

import AggregateStep from '../aggregate-step'
import CompiledStep from '../compiled-step'
import QueryStep from '../query-step'


/**
 * GroupStep
 * 
 **/
export default class GroupStep<T = unknown> implements AggregateStep<T> {
  constructor(private query: QueryStep<T>) { }

  compile(): CompiledStep<T[]> {
    return {
      reduce: () => ({}) as T,
    }
  }
}
