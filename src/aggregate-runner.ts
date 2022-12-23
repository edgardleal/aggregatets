/**
 * export-database-data.ts
 *
 * SDG
 */

/**
 * interface <T = any[]>AggregateRunner
 * 
 **/
export interface AggregateRunner<T extends Array<unknown> = any[]> {
  run: () => Promise<T[number][]>;
}
