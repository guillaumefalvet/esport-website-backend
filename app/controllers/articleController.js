const dataMapper = require('../models/dataMapper');
const debug = require('debug')('app:controllers:articleController');

const tableName = 'article';
const jsend = {
};
module.exports = {
  async getAll(_, response) {
    debug(`get all ${tableName}`);
    const results = await dataMapper.getAll(tableName);
    jsend.data = results;
    return response.status(200).json(jsend);
  },
  async getOne(request, response) {
    debug(`get one ${tableName}`);
    const { slug } = request.params;
    const result = await dataMapper.getBySlug(slug);
    if (result.rowCount === 0) {
      jsend.status = 'error';
      jsend.message = 'not found';
      return response.status(404).json(jsend);
    }
    debug(result);
    jsend.status = 'success';
    jsend.data = result.rows[0];
    return response.status(200).json(jsend);
  },
  async insertOne(request, response) {
    debug(`insertOne: ${tableName}`);
    const result = await dataMapper.createOne(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    response.status(201).json(jsend);
  },
  async updateOne(request, response) {
    debug(`updateOne: ${tableName}`);
    const { slug } = request.params;
    request.body.slug = slug;
    const result = await dataMapper.modifyBySlug(request.body);
    jsend.status = 'success';
    jsend.data = result;
    response.status(201).json(jsend);
  },
  async deleteOne(request, response) {
    debug(`deleteOne: ${tableName}`);
    const { slug } = request.params;
    await dataMapper.deleteBySlug(slug);
    response.status(204);
  },
};
