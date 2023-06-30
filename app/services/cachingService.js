const debug = require('debug')('app:service:cachingService');
const NodeCache = require('node-cache');

const cache = new NodeCache();

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

function setCache(key, ttlSeconds, value) {
  return cache.set(key, value, ttlSeconds);
}

function delCache(key) {
  debug(`cache deleted with key: ${key}`);
  return cache.del(key);
}

module.exports = {
  setCache,
  getCache,
  delCache,
};
