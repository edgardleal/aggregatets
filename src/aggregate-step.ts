/**
 * export-database-data.ts
 *
 * SDG
 */

import CompiledStep from './compiled-step'

/**
 * AggregateStep<T = unknown>
 * Query syntax for each aggregation step.
 **/
export default interface AggregateStep<T = unknown> {
  compile: () => Promise<CompiledStep<T[]>>;
}
