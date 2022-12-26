/**
 * export-database-data.ts
 *
 * SDG
 */


describe('index', () => {
  const list = [
    { tel: '23424', address: 'test address', id: 1 },
    { tel: '23425', address: 'test address', id: 2 },
    { tel: '23426', address: 'test address', id: 3 },
    { tel: '23427', address: 'test address', id: 4 },
  ];
  describe('$match', () => {
    it.todo('filtering by tel == 23424, should return only one item');
  });
  describe('$project', () => {
    it.todo('passind { tel: 1 } should return object with only the field `tel`');
  })
});
