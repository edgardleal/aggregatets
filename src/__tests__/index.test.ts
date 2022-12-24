/**
 * export-database-data.ts
 *
 * SDG
 */

import { aggregate } from '../../index'

describe('aggregate', () => {
  const list = [{ name: 'test', }, { name: 'jhon', }, { name: 'Ester' }]
  it('should return a Promise', async () => {
    const result = aggregate([], [])
    expect(result).toBeInstanceOf(Promise)
  });

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
    const promise = aggregate([], [{ $match: {}, test: {} }])
    await expect(promise).rejects.toBeInstanceOf(Error)
  });

  it('when passing an unknown operation, should throw an Error', async () => {
    const promise = aggregate([], [{ test: {} }])
    await expect(promise).rejects.toBeInstanceOf(Error)
  });
});
