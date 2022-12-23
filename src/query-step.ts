/**
 * export-database-data.ts
 *
 * All rights reserved. Do not distribute.
 * SDG
 */

export const QUERY_OPERATIONS = ['$match', '$group', '$sort', '$project']

/**
 * QueryStep<T = unknown>
 * 
 **/
export default interface QueryStep<T = unknown> {
  [key: typeof QUERY_OPERATIONS[number]]: T;
}
