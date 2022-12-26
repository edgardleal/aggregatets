/**
 * export-database-data.ts
 *
 * SDG
 */

import { aggregate } from '../../index'

describe('aggregate', () => {

  const list = [
    { name: 'test', tel: '23424', address: 'test address', id: 1 },
    { name: 'jhon', tel: '23425', address: 'test address', id: 2 },
    { name: 'Ester', tel: '23426', address: 'test address', id: 3 },
    { name: '', tel: '23427', address: 'test address', id: 4 },
  ]
  it('should return a Promise', async () => {
    const result = aggregate([], [])
    expect(result).toBeInstanceOf(Promise)
  })

  it('when passing the name field, should return only the item that match the name', async () => {
    const result = await aggregate(list, [
      {
        $match: {
          name: 'jhon'
        }
      }
    ])
    expect(result).toHaveLength(1)
  })
  it('when passing more than one field in each step, should throw an Error', async () => {
    const promise = aggregate([], [{ $match: {}, test: {} }] as any)
    await expect(promise).rejects.toBeInstanceOf(Error)
  })

  it('when passing an unknown operation, should throw an Error', async () => {
    const promise = aggregate([], [{ test: {} } as any])
    await expect(promise).rejects.toBeInstanceOf(Error)
  })

  it('filtering by tel == 23424, should return only one item', async () => {
    const result = await aggregate(list, [{
      $match: {
        tel: '23424'
      }
    }])
    expect(result).toHaveLength(1)
    expect(result[0].tel).toBe('23424')
  })

  describe('$project', () => {
    it('passind { tel: 1 } should return object with only the field `tel`', async () => {
      const result = await aggregate(list, [{ $project: { tel: 1 } }])
      expect(result[0].tel).toBeTruthy()
      expect(result[0].tel).toBeTruthy()
    })
  })
})
