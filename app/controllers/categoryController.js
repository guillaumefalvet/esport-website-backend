const debug = require('debug')('app:controllers:categoryController');
const dataMapper = require('../models/dataMapper');

const tableName = 'category';
const jsend = {
  status: '',
  data: '',
};

module.exports = {
  async getAll(request, response) {
    debug(`getAll ${tableName}`);
    const results = await dataMapper.getAll(tableName);
    jsend.data = results;

    return response.status(200).json(jsend);
  },
};
