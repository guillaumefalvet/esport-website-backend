/* eslint-disable max-len */
const debug = require('debug')('app:controllers:CoreController');
const dataMapper = require('../models/dataMapper');

const jsend = {
  status: 'success',
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
    const tableName = this.constructor.tableNameView || this.constructor.tableName;
    const result = await dataMapper.getByColumnValue(
      tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );
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
    return response.status(201).json(jsend);
  }

  async modifyOne(request, response, next) {
    debug(`${this.constructor.name} modifyOne`);
    const finalColumnName = this.constructor.secondaryColumnName || this.constructor.columnName;
    const doesExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      finalColumnName,
      request.params[finalColumnName],
    );
    if (!doesExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    request.body[finalColumnName] = request.params[finalColumnName];
    const result = await dataMapper.modifyOne(this.constructor.tableName, request.body);
    jsend.data = result;
    return response.status(200).json(jsend);
  }

  async deleteOne(request, response, next) {
    debug(`${this.constructor.name} deleteOne`);
    const doesExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );
    if (!doesExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );
    return response.status(204).send();
  }

  async createReference(request, next, referenceTableName, referenceColumName) {
    debug(`${this.constructor.name} createReference`);
    const findOrigin = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
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
      request.params[this.constructor.columnName],
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
