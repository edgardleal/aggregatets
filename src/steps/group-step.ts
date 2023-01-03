/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * export-database-data.ts
 *
 * SDG
 */

import jp from 'jsonpath'
import AggregateStep from '../aggregate-step'
import CompiledStep from '../compiled-step'
import parseJSONObject from '../parse-json-object'
import isJPath from '../path/is-jpath'
import normalizeJsonPath from '../path/normalize-jsonp'
import QueryStep from '../query-step'


/**
 * GroupStep
 * 
 **/
export default class GroupStep<T = unknown> implements AggregateStep<T> {
  constructor(private query: QueryStep<T>) { }

  createExtractKeyFunction(): (data: T) => string {
    if (typeof this.query._id === 'string') {
      if (isJPath(this.query._id)) {
        const normalizedKey = normalizeJsonPath(this.query._id)
        return (data: T): string => `${jp.query(data, normalizedKey)[0] as unknown}`
      } else {
        return () => this.query._id
      }
    } else {
      return (data: T) => JSON.stringify(parseJSONObject(this.query._id)(data)).replace(/[:{}]/, '_')
    }
  }

  createParseIdFunction(): (data: T) => any {
    if (typeof this.query._id === 'string') {
      if (isJPath(this.query._id)) {
        const normalizedKey = normalizeJsonPath(this.query._id)
        return (data: T): any => jp.query(data, normalizedKey)[0] as unknown
      } else {
        return () => this.query._id
      }
    } else {
      return (data: T) => parseJSONObject(this.query._id)(data)
    }
  }

  async compile(): Promise<CompiledStep<T[]>> {
    if (!this.query._id) {
      throw new Error('The field _id is required for group query')
    }
    const query = this.query
    const parseKeyValue = this.createParseIdFunction()
    const extractKey = this.createExtractKeyFunction()
    const aggregators = Object.keys(this.query).filter(key => key !== '_id')
    const compiled = {
      prev: {},
      result: [],
      getComputedResult(): any[] {
        const keys = Object.keys(this.prev)
        for (let i = 0; i < keys.length; i += 1) {
          const item = keys[i]
          const data = this.prev[item]
          this.result.push(computeAggregationValue(data, aggregators))
        }
        return this.result
      },
      forEach(data: T) {
        const key = extractKey(data)
        this.prev[key] = (this.prev[key] || {})
        for (let i = 0; i < aggregators.length; i += 1) {
          const aggregatorKey = aggregators[i]
          this.prev[key] = this.prev[key] || {}
          this.prev[key]._id = parseKeyValue(data)
          this.prev[key][aggregatorKey] = this.prev[key][aggregatorKey] || []
          this.prev[key][aggregatorKey].push(parseJSONObject(query[aggregatorKey])(data))
        }
        return data
      },
    }

    return compiled
  }
}

/**
 * AggregateFunctionMeta
 * Stores information about an aggregate function
 **/
export interface AggregateFunctionMeta {
  f: (v: number, act: number) => number;
  initialValue: number;
}

const AGGREGATE_FUNCTIONS: Record<string, AggregateFunctionMeta> = {
  '$sum': {
    initialValue: 0,
    f: (prev: number, act: number): number => prev + act
  },
  '$min': {
    initialValue: Number.MAX_VALUE,
    f: (prev: number, act: number): number => prev < act ? prev : act
  },
  '$max': {
    initialValue: Number.MIN_VALUE,
    f: (prev: number, act: number): number => prev > act ? prev : act
  },
}

function computeAggregationValue(data: any, aggregators: string[]): any {
  for (let i = 0; i < aggregators.length; i += 1) {
    const item = aggregators[i]
    if (!data[item] || !data[item].length) {
      continue
    }
    const func = Object.keys(data[item][0])[0]
    const values: number[] = data[item].map((i: any) => i[func])
    const funcMeta = AGGREGATE_FUNCTIONS[func]
    if (!funcMeta) {
      throw new Error(`Unknow function: ${func}`)
    }
    data[item] = values.reduce(funcMeta.f, funcMeta.initialValue)
  }
  return data
}

