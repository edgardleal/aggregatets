/**
 * export-database-data.ts
 *
 * SDG
 */

import jp from 'jsonpath'
import { omit, pick } from 'lodash'
import AggregateStep from '../aggregate-step'
import CompiledStep from '../compiled-step'
import isJPath from '../path/is-jpath'
import normalizeJsonPath from '../path/normalize-jsonp'
import QueryStep from '../query-step'


type FunctionItemType<T = unknown> = { field: string, func: (data: T) => unknown }
/**
 * ProjectStep
 * 
 **/
export default class ProjectStep<T = unknown> implements AggregateStep<T> {

  constructor(private query: QueryStep<T>) { }

  compile(): CompiledStep<T[]> {
    if (this.query.$project) {
      throw new Error(`Wrong query syntax: ${JSON.stringify(this.query, null, 2)}`,)
    }
    const queryFields = Object.keys(this.query)
    const pickList: string[] = []
    const omitList: string[] = []
    const functionList: FunctionItemType[] = []

    queryFields.forEach((field: string) => {
      const fieldValue = this.query[field]
      if (fieldValue === 1) {
        pickList.push(field)
      } else if (fieldValue === -1) {
        omitList.push(field)
      } else if (typeof fieldValue === 'function') {
        functionList.push({
          field,
          func: fieldValue as unknown as (dada: T) => unknown
        })
      } else if (typeof fieldValue === 'string' && isJPath(fieldValue)) {
        functionList.push({
          field,
          func: (data: T) => jp.query(data, normalizeJsonPath(fieldValue))[0] as unknown
        })
      } else {
        functionList.push({
          field,
          func: () => fieldValue
        })
      }
    })
    return {
      map: (data: T): T => {

        let result = {
          ...pick(data, pickList),
        } as unknown as T
        if (omitList.length) {
          result = omit(result as any, omitList) as any
        }

        for (let i = 0; i < functionList.length; i += 1) {
          const item: FunctionItemType = functionList[i] as any
          (result as any)[item.field] = item.func(data)
        }

        return result
      }
    }
  }
}
