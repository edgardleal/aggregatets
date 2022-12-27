/**
 * export-database-data.ts
 *
 * SDG
 */

import jp from 'jsonpath'
import isJPath from './path/is-jpath'
import normalizeJsonPath from './path/normalize-jsonp'

/**
 * parseJSONObject
 **/
export default function parseJSONObject(query: any): (data: any) => any {
  const keys = Object.keys(query)
  return (data: any): any => {
    const result: any = {}
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i]
      const keyValue = query[key]
      if (typeof keyValue === 'object') {
        result[key] = parseJSONObject(keyValue)(data)
      } else if (typeof keyValue === 'string') {
        if (isJPath(keyValue)) {
          const normalized = normalizeJsonPath(keyValue)
          result[key] = jp.query(data, normalized)[0] as unknown
        } else {
          result[key] = keyValue
        }
      } else {
        result[key] = keyValue
      }
    }
    return result

  }
}
