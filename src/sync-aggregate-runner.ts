/**
 * export-database-data.ts
 *
 * All rights reserved. Do not distribute.
 * SDG
 */

import { AggregateRunner } from './aggregate-runner'
import CompiledStep from './compiled-step'

/**
 * SyncAggregateRunner
 * 
 **/
export default class SyncAggregateRunner<T extends Array<unknown> = unknown[]> implements AggregateRunner<T> {
  constructor(private data: T, private steps: CompiledStep<T>[]) { }

  async run(): Promise<T[number][]> {
    let currentList = [...this.data]

    for (let i = 0; i < this.steps.length; i += 1) {
      const item = this.steps[i]
      if (item.filter) {
        currentList = currentList.filter(item.filter.bind(item))
      }
      if (item.map) {
        currentList = currentList.map(item.map.bind(item))
      }
      if (item.reduce) {
        currentList = currentList.reduce(item.reduce.bind(item)) as unknown as any
      }
    }
    return currentList
  }
}
