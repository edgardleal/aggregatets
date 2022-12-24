/**
 * export-database-data.ts
 *
 * SDG
 */

import MatchStep from '../steps/match-step'
import SyncAggregateRunner from '../sync-aggregate-runner'

type TestObject = { name: string };
describe('sync-aggregate-runner', () => {
  const list = [{ name: 'test', }, { name: 'jhon', }, { name: 'Ester' }]
  it('when passing the name field, should return only the item that match the name', async () => {

    const compiled = new MatchStep<TestObject>({
      name: 'jhon'
    } as any).compile()
    const result = await new SyncAggregateRunner<{ name: string }[]>(list, [compiled]).run()
    expect(result).toHaveLength(1)
  })
})
