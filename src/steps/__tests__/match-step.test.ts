/**
 * export-database-data.ts
 *
 * SDG
 */

import MatchStep from '../match-step'

describe('compile', () => {
  it('should fill the field filter only', async () => {
    const result = await new MatchStep({
      name: 'test',
      value: '$otherField'
    }).compile()
    expect(result.filter).toBeDefined()
    expect(result.map).not.toBeDefined()
    expect(result.reduce).not.toBeDefined()
  })
  it('when applied to a list, should result a new filtered list', async () => {
    const list = [
      { name: 'Jhon', value: 10, otherField: 15 },
      { name: 'test', value: 10, otherField: 15 },
      { name: 'test', value: 10, otherField: 10 },
    ]
    const step = await new MatchStep({
      name: 'test',
      value: '$otherField'
    }).compile()

    const filterFunc = step.filter?.bind(step)

    const result = list.filter(filterFunc)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('test')
  })
})
