const debug = require('debug')('app:controllers:mediaController');
const dataMapper = require('../models/dataMapper');

const tableName = 'media';
const jsend = {
  status: '',
  data: '',
};
module.exports = {
  async getAll(request, response) {
    debug(`getAll ${tableName}`);
    debug(request.query);
    // check the type of the query, false for photo.
    if (request.query.type === 'photo') {
      const result = await dataMapper.getByType(false);
      jsend.status = 'success';
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

  async insertOne(request, response) {
    debug(`insertOne ${tableName}`);
    // const { link } = request.body;

    const result = await dataMapper.createOne(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    response.status(201).json(jsend);
  },
  async updateOne(request, response, next) {
    debug(`updateOne ${tableName}`);
    const { id } = request.params;
    debug(request.body);
    request.body.id = id;
    const findMedia = await dataMapper.getByPk(tableName, id);
    if (!findMedia.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // request.body.id = id;
    const result = await dataMapper.modifyByPk(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(201).json(jsend);
  },
  async deleteOne(request, response, next) {
    debug(` deleteOne ${tableName}`);
    const { id } = request.params;
    const findMedia = await dataMapper.getByPk(tableName, id);
    if (!findMedia.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByPk(tableName, id);
    return response.status(204);
  },
};
