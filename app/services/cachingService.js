/**
 * Caching Service module.
 * @module cachingService
 */

const debug = require('debug')('app:service:cachingService');
const NodeCache = require('node-cache');

const cache = new NodeCache();

/**
 * Retrieves data from the cache using the specified key.
 *
 * @param {string} key - The key associated with the data in the cache.
 * @returns {*} The data associated with the key, or false if no cache found.
 */
function getCache(key) {
  debug(`getting cache with key: ${key}`);
  const cacheData = cache.get(key);
  if (cacheData) {
    debug(`data found in the cache ${key}`);
    return cacheData;
  }
  debug('no cache found');
  return false;
}

/**
 * Sets data in the cache using the specified key and value.
 *
 * @param {string} key - The key to associate with the value in the cache.
 * @param {*} value - The value to be stored in the cache.
 * @returns {boolean} True if the cache is set successfully, false otherwise.
 */
function setCache(key, value) {
  const seconds = 60;
  const minutes = 60;
  const hours = 24;
  const days = 7;
  const ttlSeconds = seconds * minutes * hours * days;
  return cache.set(key, value, ttlSeconds);
}

/**
 * Deletes data from the cache using the specified key.
 *
 * @param {string} key - The key associated with the data in the cache.
 * @returns {boolean} True if the cache is deleted successfully, false otherwise.
 */
function delCache(key) {
  debug(`cache deleted with key: ${key}`);
  return cache.del(key);
}

module.exports = {
  setCache,
  getCache,
  delCache,
};
