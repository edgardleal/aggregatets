/**
 * export-database-data.ts
 *
 * Copyright © Stationfy, Inc 2022.
 *
 * All rights reserved. Do not distribute.
 * SDG
 */

import MatchStep from '../match-step'

describe('compile', () => {
  it('should fill the field filter only', () => {
    const result = new MatchStep({
      name: 'test',
      value: '$otherField'
    }).compile()
    expect(result.filter).toBeDefined()
    expect(result.map).not.toBeDefined()
    expect(result.reduce).not.toBeDefined()
  })
  it('when applied to a list, should result a new filtered list', () => {
    const list = [
      { name: 'Jhon', value: 10, otherField: 15 },
      { name: 'test', value: 10, otherField: 15 },
      { name: 'test', value: 10, otherField: 10 },
    ]
    const step = new MatchStep({
      name: 'test',
      value: '$otherField'
    })

    const filterFunc = step.compile().filter?.bind(step)

    const result = list.filter(filterFunc)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('test')
  })
})
