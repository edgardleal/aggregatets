/**
 * export-database-data.ts
 *
 * SDG
 */

import parseJSONObject from '../parse-json-object';

describe('parseJSONObject', () => {
  it('when the value is a number, should return the same object', () => {
    const input = { value: 3 }
    const result = parseJSONObject(input)(input)
    expect(result).toStrictEqual(input)
  });
  it('when the value is a boolean, should return the same object', () => {
    const input = { status: false }
    const result = parseJSONObject(input)(input)
    expect(result).toStrictEqual(input)
  });
  it('when the value is a simple string, should return the same object', () => {
    const input = { name: 'Test name' }
    const result = parseJSONObject(input)(input)
    expect(result).toStrictEqual(input)
  });
  it('when the value is a jPath, should return a new object with the equivalent data in the path', () => {
    const input = { name: 'Test name' }
    const result = parseJSONObject({ identifier: '$name' })(input)
    expect(result).toStrictEqual({ identifier: input.name })
  });
  it('should resolve recursive objects', () => {
    const input = { name: 'Test name', address: { street: 'street of tests' }}
    const result = parseJSONObject({ identifier: '$name' })(input)
    expect(result).toStrictEqual({ identifier: input.name })
  });
});
