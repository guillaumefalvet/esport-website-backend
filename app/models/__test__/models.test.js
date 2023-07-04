const { getAll } = require('../dataMapper');
const clients = require('../clients');
require('dotenv').config();

async function database() {
  const data = await getAll('article');
  return data;
}
describe('Models: dataMapper getAll articles', () => {
  test('should return an object', async () => {
    const data = await database();
    expect(typeof data).toBe('object');
  });
  test('should have a slug', async () => {
    const data = await database();
    expect(data[0].slug).toBeTruthy();
  });
});

describe('Models: Clients', () => {
  test('should be truthy', () => {
    expect(clients).toBeTruthy();
  });
});
