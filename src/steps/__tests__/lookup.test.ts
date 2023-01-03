/**
 * export-database-data.ts
 *
 * SDG
 */

import CompiledStep from "../../compiled-step";
import LookupStep, { LookupQuery } from "../lookup";

describe('lookup', () => {
  const list = [
    { id: 1, name: 'Jhon', value: 20 },
    { id: 2, name: 'Mary', value: 30 },
    { id: 3, name: 'Tom', value:  40 },
    { id: 4, name: 'Jiim', value: 11 },
    { id: 5, name: 'Page', value: 12 },
  ]
  async function compile<T = any, R = any>(query: LookupQuery<T>): Promise<CompiledStep<T[], R>> {
    const compiled = await new LookupStep<T, R>(query).compile()
    return compiled
  }
  it('should match two different arrays based on localField and foreignField values', async () => {
    const compiled = await compile({
      localField: 'name',
      from: Promise.resolve([{ customer: 'Mary', tel: '123423' }]),
      foreignField: 'customer',
      as: 'phone',
    })

    list.forEach(compiled.forEach?.bind(compiled))
    const result = compiled.getComputedResult!()[0]
    expect(result.name).toBe('Mary')
  });
  it('field defined in `as` parameter should be an array', async () => {
    const compiled = await compile({
      localField: 'value',
      from: Promise.resolve([{ value: 40, id: 87878 }]),
      foreignField: 'value',
      as: 'items',
    })

    list.forEach(compiled.forEach?.bind(compiled))
    const result = compiled.getComputedResult!()[0]
    expect(result.items).toHaveLength(1)
  });
  it('should return only the items that match the condition', async () => {
    const compiled = await compile({
      localField: 'id',
      from: Promise.resolve([{ customer: 2, tel: '123423' }, { customer: 4, tel: 'oeanest' }]),
      foreignField: 'customer',
      as: 'phone',
    })

    list.forEach(compiled.forEach?.bind(compiled))
    const result = compiled.getComputedResult!()
    expect(result).toHaveLength(2)
  });
  it('should merge two arrays based on the filter function', async () => {
    const compiled = await compile({
      filter: ({ local, foreign }: any) => foreign.fullName.indexOf(local.name) > -1,
      from: Promise.resolve([{ fullName: 'Mary Jane', history: [] }]),
      as: 'phone',
    })

    list.forEach(compiled.forEach?.bind(compiled))
    const result = compiled.getComputedResult!()
    expect(result).toMatchSnapshot()
  });
  it.each([
    { filter: null, localField: null, foreignField: 'test' },
    { filter: null, localField: 'name', foreignField: null },
  ])('when filter is null, and localField is $localField and foreignField is $foreignField should throw an Error', async ({ filter, foreignField, localField }) => {
      const promise = new LookupStep({ filter, localField, foreignField } as any).compile()
      await expect(promise).rejects.toBeInstanceOf(Error)
    });

  it.each([
    { result: true, filter: null, localField: 'test', foreignField: 'test' },
    { result: true, filter: () => true, localField: null, foreignField: null },
  ])('when filter is filled or localField is $localField and foreignField is $foreignField should not throw an Error', async ({ filter, foreignField, localField }) => {
      const promise = new LookupStep({ filter, localField,foreignField } as any).compile()
      await expect(promise).resolves.toBeTruthy()
    });
});

