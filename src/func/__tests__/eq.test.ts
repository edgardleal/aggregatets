/**
 * export-database-data.ts
 *
 * 
 *
 * All rights reserved. Do not distribute.
 * SDG
 */

import { eq } from '../eq'

describe('eq', () => {
  it('should return a function', () => {
    const func = eq(() => 1, () => 2)
    expect(func).toBeInstanceOf(Function)
  })
  describe('calling resulted function', () => {
    it('when the functions return the same value, should return true', () => {
      const func = eq(() => 1, () => 1)
      const result = func({})
      expect(result).toBeTruthy()
    })
    it('when the functions return different values, should return false', () => {
      const func = eq(() => 4, () => 9)
      const result = func({})
      expect(result).toBeFalsy()
    })
  })
})
