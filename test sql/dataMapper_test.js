const dataMapper = require('../app/models/dataMapper');
require('dotenv').config();
// eslint-disable-next-line import/order, no-unused-vars
const debug = require('debug')('test:sql');

async function test() {
  const getArticle = await dataMapper.getAll('article');
  console.log(getArticle);
  process.exit(1);
}

test();
