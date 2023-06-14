/* eslint-disable camelcase */
const dataMapper = require('../models/dataMapper');
const debug = require('debug')('app:controllers:teamController');

const tableName = 'player';
const jsend = {
  status: '',
  data: '',
};

module.exports = {
  async getAll(_, response) {
    debug(`get all ${tableName}`);
    const results = await dataMapper.getAll('player_view');
    jsend.data = results;
    jsend.status = 'success';
    return response.status(200).json(jsend);
  },
  async getOne(request, response, next) {
    debug(`get one ${tableName}`);
    const { user_name } = request.params;
    const result = await dataMapper.getByUserName('player_view', user_name);
    if (result.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  },
  async insertOne(request, response) {
    debug(`insertOne: ${tableName}`);
    const result = await dataMapper.createOne(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    response.status(201).json(jsend);
  },
  async updateOne(request, response, next) {
    debug(`updateOne: ${tableName}`);
    const { user_name } = request.params;
    request.body.user_name = user_name;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const result = await dataMapper.modifyByUserName(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(201).json(jsend);
  },
  async deleteOne(request, response, next) {
    debug(`deleteOne: ${tableName}`);
    const { user_name } = request.params;
    const findPlayer = await dataMapper.getByUserName(tableName, user_name);
    if (findPlayer.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByUserName(tableName, user_name);
    return response.status(204);
  },
};
