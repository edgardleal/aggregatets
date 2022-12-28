/**
 * export-database-data.ts
 *
 * SDG
 */

import normalizeJsonPath from '../normalize-jsonp'

describe('normalizeJsonPath', () => {
  it.each([
    { input: '', result: '' },
    { input: null, result: null },
    { input: 'test', result: '$.test' },
    { input: '$name', result: '$.name' },
    { input: '$.name', result: '$.name' },
  ])('when receive $input, should return $result', ({ input, result }) => {
    expect(normalizeJsonPath(input as any)).toBe(result)
  })
})
