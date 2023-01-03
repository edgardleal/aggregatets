/**
 * export-database-data.ts
 *
 * SDG
 */

import GroupStep from '../group-step'

describe('group-step', () => {
  const list = [
    { name: 'a', type: 'G', value: 1 },
    { name: 'b', type: 'Y', value: 4 },
    { name: 'b', type: 'Y', value: 2 },
    { name: 'b', type: 'G', value: 3 },
  ]

  async function queryData(query: any): Promise<any[]> {
    const compiled = await new GroupStep(query).compile()
    list.forEach(compiled?.forEach?.bind(compiled))
    return compiled.getComputedResult ? compiled.getComputedResult() : []
  }

  it('when the field _id is not present, shoud throw an error', async () => {
    await expect(() => new GroupStep({}).compile()).rejects.toBeInstanceOf(Error)
  })
  it('whe using "name" as _id, should return [{ "_id": "a", total: 1}, {"name": "b", total: 9 }]', async () => {
    const result = await queryData({
      _id: '$name',
      total: { $sum: '$value' }
    })

    expect(result).toHaveLength(2)
  })
  it('when passing an invalid json path on _id field, should use the string value as group key', async () => {
    const result = await queryData({ _id: 'test', value: { $sum: 1 } })
    expect(result).toHaveLength(1)
    expect((result[0] as any)._id).toBe('test')
  })

  it('when grouping by type and name, should return 3 groups', async () => {
    const result = await queryData({ _id: { name: '$name', type: '$type' }, value: { $sum: 1 } })
    expect(result).toHaveLength(3)
    expect(result[0]._id.name).toBe('a')
  })
  it('when grouping by value, should return 4 groups', async () => {
    const result = await queryData({ _id: '$value', value: { $sum: 1 } })
    expect(result).toHaveLength(4)
    expect(result[0]._id).toBe(1)
  })
  it('when grouping with $min value , should return 1', async () => {
    const result = await queryData({ _id: '$name', value: { $min: '$value' } })
    expect(result[0].value).toBe(1)
    expect(result[1].value).toBe(2)
  })
  it('when grouping with $max value , should return 4', async () => {
    const result = await queryData({ _id: '$name', value: { $max: '$value' } })
    expect(result[1].value).toBe(4)
  })
})
