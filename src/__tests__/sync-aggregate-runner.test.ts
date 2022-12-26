/**
 * export-database-data.ts
 *
 * SDG
 */

import MatchStep from '../steps/match-step'
import ProjectStep from '../steps/project-step'
import SyncAggregateRunner from '../sync-aggregate-runner'

type TestObject = { name: string; value: number };
describe('sync-aggregate-runner', () => {
  const list = [{ name: 'test', value: 10 }, { name: 'jhon', value: 32 }, { name: 'Ester', value: 150 }]
  describe('$match', () => {
    it('when passing the name field, should return only the item that match the name', async () => {
      const compiled = new MatchStep<TestObject>({
        name: 'jhon'
      } as any).compile()
      const result = await new SyncAggregateRunner<{ name: string }[]>(list, [compiled]).run()
      expect(result).toHaveLength(1)
    })
  })
  describe('$project', () => {
    it('should return only the field in the project steps', async () => {
      const compiled = new ProjectStep<TestObject>({
        name: 1
      } as any).compile()
      const result = await new SyncAggregateRunner<{ name: string }[]>(list, [compiled]).run()

      expect(result[0].name).toBeTruthy()
      expect((result[0] as any).value).toBeFalsy()
    })
  })
})
