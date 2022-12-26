/**
 * export-database-data.ts
 *
 * SDG
 */

/**
 * Will check if a field path start with $., if not will include the rigth prefix.
 * e.g.:
 * name => $.name
 * $value => $.value
 * obj.nested.value => $.obj.nested.value
 **/
export default function normalizeJsonPath(value: string): string {
  if (!value) {
    return value
  }
  if (value.startsWith('$')) {
    if (value.startsWith('$.')) {
      return value
    } else {
      return value.replace('$', '$.')
    }
  } else {
    return `$.${value}`
  }
}
