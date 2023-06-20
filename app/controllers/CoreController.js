/* eslint-disable max-len */
const debug = require('debug')('app:controllers');
const dataMapper = require('../models/dataMapper');

const jsend = {
  status: 'success',
  data: '',
};
class CoreController {
  async getAll(_, response) {
    debug(`${this.constructor.name} getAll`);
    const results = await dataMapper.getAll(this.constructor.tableName);
    jsend.data = results;
    return response.status(200).json(jsend);
  }

  async getOne(request, response, next) {
    debug(`${this.constructor.name} getOne`);
    const result = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    debug(result);
    if (!result) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    jsend.data = result;
    return response.status(200).json(jsend);
  }

  async createOne(request, response, next) {
    debug(`${this.constructor.name} createOne`);
    debug(request.body[this.constructor.columnName]);
    const alradyExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.body[this.constructor.columnName],
    );

    if (alradyExist) {
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    const result = await dataMapper.createOne(this.constructor.tableName, request.body);
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
      return next(error);
    }
    request.body[this.constructor.paramsLink] = request.params[this.constructor.paramsLink];
    const result = await dataMapper.modifyOne(this.constructor.tableName, request.body);
    jsend.data = result;
    return response.status(200).json(jsend);
  }

  async deleteOne(request, response, next) {
    debug(`${this.constructor.name} deleteOne`);
    const doesExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    if (!doesExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    return response.status(204);
  }

  async createReference(request, next, referenceTableName, referenceColumName) {
    debug(`${this.constructor.name} createReference`);
    const findOrigin = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    if (!findOrigin) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`Origin exist: ${findOrigin ? 'true' : 'false'}`);
    const findReference = await dataMapper.getByColumnValue(
      referenceTableName,
      referenceColumName,
      request.params[referenceColumName],
    );
    debug(`Reference exist: ${findReference ? 'true' : 'false'}`);
    if (!findReference) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const originAndReferenceRelationExist = await dataMapper.getReferenceTable(this.constructor.tableName, referenceTableName, findOrigin.id, findReference.id);
    debug(`relation exist already :${originAndReferenceRelationExist ? 'true' : 'false'}`);
    if (originAndReferenceRelationExist) {
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    await dataMapper.insertReferenceTable(this.constructor.tableName, referenceTableName, findOrigin.id, findReference.id);
    return true;
  }

  async deleteReference(request, next, referenceTableName, referenceColumName) {
    debug(`${this.constructor.name} deleteReference`);
    const findOrigin = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.paramsLink],
    );
    if (!findOrigin) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    debug(`Origin exist: ${findOrigin ? 'true' : 'false'}`);
    const findReference = await dataMapper.getByColumnValue(
      referenceTableName,
      referenceColumName,
      request.params[referenceColumName],
    );
    debug(`Reference exist: ${findReference ? 'true' : 'false'}`);
    if (!findReference) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    const originAndReferenceRelationExist = await dataMapper.getReferenceTable(this.constructor.tableName, referenceTableName, findOrigin.id, findReference.id);
    debug(`relation exist already :${originAndReferenceRelationExist ? 'true' : 'false'}`);
    if (!originAndReferenceRelationExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByColumnValue(`${this.constructor.tableName}_has_${referenceTableName}`, referenceColumName, originAndReferenceRelationExist.id);
    return true;
  }
}

module.exports = CoreController;
