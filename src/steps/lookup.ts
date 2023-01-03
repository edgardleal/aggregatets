/**
 * export-database-data.ts
 *
 * SDG
 */

import AggregateStep from '../aggregate-step'
import CompiledStep from '../compiled-step'
import { generateEqualForFields } from '../func/eq'

/**
 * LookupQuery
 * A lookup query definition
 **/
export interface LookupQuery<T> {
  from: Promise<Array<T>>;
  localField?: string;
  foreignField?: string;
  filter?: (a: unknown, b:unknown) => boolean;
  as: string;
}

/**
 * LookupStep
 * Will join two collections based on filter criteria
 **/
export default class LookupStep<T = unknown, R = unknown> implements AggregateStep<T> {
  constructor(private query: LookupQuery<T>) {}

  async compile(): Promise<CompiledStep<T[], R>> {
    if (!this.query.filter && (!this.query.localField || !this.query.foreignField)) {
      throw new Error('You should inform a `filter` function or the value for `localField` and `foreignField`')
    }
    const foreignList = await this.query.from
    const query = this.query
    const computedList: R[] = []
    return {
      forEach(item: T) {
        const filterFunction = query.filter || generateEqualForFields(`local.${query.localField}`, `foreign.${query.foreignField}`)
        foreignList.forEach((foreignItem: unknown) => {
          const joined = {
            local: item,
            foreign: foreignItem,
          }
          if (filterFunction(joined)) {
            computedList.push({
              ...item,
              [query.as]: [...((item as any)[query.as] || []), foreignItem],
            } as R)
          }
        })
        return item
      },
      getComputedResult(): R[] {
        return computedList
      }
    }
  }
}
