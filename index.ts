/**
 * index.ts
 *
 * @module index.ts
 */
import * as sourceMapSupport from 'source-map-support'
import AggregateStep from './src/aggregate-step'
import CompiledStep from './src/compiled-step'
import QueryStep from './src/query-step'
import GroupStep from './src/steps/group-step'
import MatchStep from './src/steps/match-step'
import SyncAggregateRunner from './src/sync-aggregate-runner'

sourceMapSupport.install()

const OPERATIONS: { [key: string]: { new (query: unknown): AggregateStep } } = {
  $match: MatchStep,
  $group: GroupStep
}

/**
 * aggregate
 **/
export async function aggregate<T = unknown>(data: T[], steps: QueryStep<T>[]): Promise<T[]> {
  const compiledSteps: CompiledStep<T[]>[] = []
  for (let i = 0; i < steps.length; i += 1) {
    const item = steps[i]
    const keys = Object.keys(item)
    if (keys.length > 1) {
      throw new Error(`You can use only one operation by aggregation steps, operations used: [${keys.join(',')}]`)
    }
    const clazz = OPERATIONS[keys[0]]
    if (!clazz) {
      throw new Error(`Unknown operation: ${keys[0]}`)
    }
    const instance = new clazz(item[keys[0]])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    compiledSteps.push(instance.compile() as any)
  }

  return new SyncAggregateRunner(data, compiledSteps).run()
}
