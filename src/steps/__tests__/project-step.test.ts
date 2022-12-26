/**
 * export-database-data.ts
 *
 * SDG
 */

import ProjectStep from '../project-step';

const list = [
  { name: 'test', num: 20, tel: '123123' },
  { name: 'test', num: 30, tel: '123123' },
  { name: 'test', num: 40, tel: '123123' },
  { name: 'test', num: 50, tel: '123123' },
  { name: 'test', num: 60, tel: '123123' },
];
describe('$project', () => {
  it('when passing the field $project inside the query, should throw an error', () => {
    const step = new ProjectStep({ $project: { name: 1 } });
    expect(() => step.compile().map?.bind(step)).toThrow()
  });
  it('should accepts 1 for fields that already exists and should continue', () => {
    const step = new ProjectStep({ name: 1 });
    const result: any[] = list.map(step.compile().map?.bind(step))
    expect(result[0].name).toBeTruthy()
  });

  it('should accepts -1 for fields that should be omited', () => {
    const step = new ProjectStep({ name: -1 });
    const result: any[] = list.map(step.compile().map?.bind(step))
    expect(result[0].name).toBeFalsy()
  });
  it('should accept a string with a path to define the value for the fields', () => {
    const step = new ProjectStep({ val: '$num' });
    const result: any[] = list.map(step.compile().map?.bind(step))
    expect(result[0].val).toBeTruthy()
    expect(result[0].num).toBeFalsy()
  });
  it('when receive a simple string, should return the field with this value', () => {
    const step = new ProjectStep({ newField: 'fixedValue' });
    const result: any[] = list.map(step.compile().map?.bind(step))
    expect(result[0].newField).toBe('fixedValue')
  });
  it('should accept a function to return the value of the fields', () => {
    const value = 'value from function'
    const funcField = jest.fn(() => value)
    const step = new ProjectStep({ funcField  });
    const result: any[] = list.map(step.compile().map?.bind(step))
    expect(result[0].funcField).toBe(value)
  });
});
