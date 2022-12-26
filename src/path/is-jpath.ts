/**
 * export-database-data.ts
 *
 * SDG
 */

/**
 * Check if a value is an string representing a json path
 **/
export default function isJPath(value: unknown): boolean {
  return !!value && typeof value === 'string' && (value as string).startsWith('$')
}
