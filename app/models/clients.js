const debug = require('debug')('app:models:client');
const { Pool } = require('pg');

const pool = new Pool();

pool.connect().then(() => {
  debug('database client connected');
});

module.exports = pool;
