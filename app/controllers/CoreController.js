/* eslint-disable max-len */
const debug = require('debug')('app:controllers');
const dataMapper = require('../models/dataMapper');

const jsend = {
  status: '',
  data: '',
};
/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  async getAll(_, response) {
    debug(`${this.constructor.name} getAll`);
    const results = await dataMapper.getAll(this.constructor.tableName);
    response.json(results);
  }

  static error = new Error();

  async getOne(request, response, next) {
    debug(`${this.constructor.name} getOne`);
    const result = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    if (!result) {
      const error = new Error();
      error.code = 404;
      return next(this.error);
    }
    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  }

  async createOne(request, response, next) {
    debug(`${this.constructor.name} createOne`);
    const alradyExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    if (alradyExist) {
      const error = new Error();
      error.code = 303;
      return next(this.error);
    }
    const result = await dataMapper.createOne(this.constructor.tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  }

  async modifyOne(request, response, next) {
    debug(`${this.constructor.name} modifyOne`);
    const doesExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    if (!doesExist) {
      const error = new Error();
      error.code = 404;
      return next(this.error);
    }
    request.body[this.constructor.paramsLink] = request.params[this.constructor.paramsLink];
    debug(request.body);
    const result = await dataMapper.modifyOne(this.constructor.tableName, request.body);
    jsend.status = 'success';
    jsend.data = result;
    return response.status(200).json(jsend);
  }

  async deleteOne(request, response) {
    debug(`${this.constructor.name} delete`);
    const { id } = request.params;
    dataMapper.delete(id);
    return response.status(204).send();
  }
}

module.exports = CoreController;
