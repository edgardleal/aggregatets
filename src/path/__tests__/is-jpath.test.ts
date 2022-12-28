/**
 * export-database-data.ts
 *
 * SDG
 */

import isJPath from '../is-jpath'

describe('isJPath', () => {
  it.each([
    { input: '', result: false },
    { input: null, result: false },
    { input: 'normal text', result: false },
    { input: '$test', result: true },
  ])('when receive $input as input, should return $result', ({ input, result }) => {
    expect(isJPath(input)).toBe(result)
  })
})

