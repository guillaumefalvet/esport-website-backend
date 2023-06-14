const debug = require('debug')('app:controllers:mediaController');
const dataMapper = require('../models/dataMapper');

const tableName = 'media';
const jsend = {
  success: '',
  data: '',
};
module.exports = {
  async getAll(request, response) {
    debug(`getAll ${tableName}`);
    debug(request.query);
    // check the type of the query, false for photo.
    if (request.query.type === 'photo') {
      const result = await dataMapper.getByType(false);
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    // check the type of the query, true for video.
    if (request.query.type === 'video') {
      const result = await dataMapper.getByType(true);
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    //  if no query type
    const results = await dataMapper.getAll(tableName);
    jsend.data = results;

    return response.status(200).json(jsend);
  },
};
