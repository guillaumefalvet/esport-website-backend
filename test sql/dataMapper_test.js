const dataMapper = require('../app/models/dataMapper');
require('dotenv').config();
const debug = require('debug')('test:sql');

async function test() {
  const getUser = await dataMapper.getUser('john_doe');
  console.log(getUser);
  const getArticle = await dataMapper.getAll('article');
  console.log(getArticle);
  process.exit(1);
}

test();
