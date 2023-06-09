const debug = require('debug')('app:models:client');
const { Pool } = require('pg');

const client = new Pool();
debug('client connected');
client.connect();

module.exports = client;
