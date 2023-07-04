const cachingService = require('../cachingService');

const key = 'jest';
const testValue = 'jest is awesome';
describe('Services: cacheService', () => {
  test(`should set a value in cache with the use of the (${key}) and return true`, () => {
    const set = cachingService.setCache(key, testValue);
    expect(set).toBeTruthy();
  });
  test(`should get the value in cache with the key(${key})`, () => {
    const get = cachingService.getCache(key);
    expect(get).toBe(testValue);
  });
});
