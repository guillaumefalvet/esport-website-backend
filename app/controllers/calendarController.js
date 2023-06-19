/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
const debug = require('debug')('app:controllers:calendarController');
const dataMapper = require('../models/dataMapper');

const tableName = 'calendar';
const jsend = {
  status: '',
  data: '',
};
module.exports = {
  async getAll(request, response) {
    const { home } = request.query;
    if (home === 'true') {
      debug('getCalendarHome');
      const result = await dataMapper.getCalendarHome();
      jsend.data = result.data;
      jsend.status = 'success';
      return response.status(200).json(jsend);
    }
    debug(`get all ${tableName}`);
    const results = await dataMapper.getAllCalendar();
    jsend.status = 'success';
    jsend.data = results.data;
    return response.status(200).json(jsend);
  },
  async getOne(request, response, next) {
    debug(`get one ${tableName}`);
    const { id } = request.params;
    const result = await dataMapper.getByPk(tableName, id);
    if (!result.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    jsend.status = 'success';
    jsend.data = result[0];
    return response.status(200).json(jsend);
  },
  async insertOne(request, response, next) {
    debug(`insertOne: ${tableName}`);
    const { event_name } = request.body;
    const findEvent = await dataMapper.getByColumnValue(tableName, 'event_name', event_name);
    if (findEvent.length) {
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    const result = await dataMapper.createOne(tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(201).json(jsend);
  },
  async updateOne(request, response, next) {
    debug(`updateOne: ${tableName}`);
    const { id } = request.params;
    request.body.id = id;
    const findEvent = await dataMapper.getByPk(tableName, id);
    if (!findEvent.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const result = await dataMapper.modifyByPk(tableName, request.body);

    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  },
  async deleteOne(request, response, next) {
    debug(`deleteOne: ${tableName}`);
    const { id } = request.params;
    const findEvent = await dataMapper.getByPk(tableName, id);
    if (!findEvent.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByPk(tableName, id);
    return response.status(204);
  },
};
