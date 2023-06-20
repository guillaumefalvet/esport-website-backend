/* eslint-disable max-len */
const debug = require('debug')('app:controllers:recruitment');
const fs = require('fs');
const uploadHandler = require('../services/uploadService');
const dataMapper = require('../models/dataMapper');
const { createRecruitment } = require('../validations/schemas/recruitment-schema');
const CoreController = require('./CoreController');

const API_URL = process.env.API_URL ?? '';
const tableName = 'recruitment';
const jsend = {
  status: 'success',
};

class RecruitmentController extends CoreController {
  static tableName = 'recruitment';

  static columnName = 'user_name';

  constructor() {
    super();
    debug('RecruitmentController created');
  }

  async insertRecruitment(request, response, next) {
    try {
      const imageUpload = await uploadHandler(request, 'private', 'pdf', 'cv', next);
      const updatedData = {
        ...request.body,
      };
      if (!imageUpload.path.length) {
        updatedData.external_link = '';
      } else {
        updatedData.external_link = `${API_URL}${imageUpload.path}`;
      }
      await createRecruitment.validateAsync(updatedData);
      const alradyExist = await dataMapper.getByColumnValue(
        this.constructor.tableName,
        this.constructor.columnName,
        updatedData.user_name,
      );

      if (alradyExist) {
        const fileToDelete = updatedData.external_link.split(API_URL);
        debug(fileToDelete);
        fs.unlinkSync(`./${fileToDelete[1]}`);
        debug('local file deleted');
        const error = new Error();
        error.code = 303;
        return next(error);
      }
      const result = await dataMapper.createOne(this.constructor.tableName, updatedData);
      debug('Recruitment created successfully');
      jsend.data = result;
      return response.status(201).json(jsend);
    } catch (err) {
      debug('Error while creating recruitment', err);
      return next(err);
    }
  }

  async deleteRecruitment(request, response, next) {
    debug(`deleteOne: ${tableName}`);
    const findRecruitment = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      'id',
      request.params.id,
    );
    debug(request.params.id);
    if (!findRecruitment) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    if (findRecruitment.external_link.length) {
      // verification si il n'est pas vide
      const fileToDelete = findRecruitment.external_link.split(API_URL);
      fs.unlinkSync(`./${fileToDelete[1]}`);
      debug('local file deleted');
    }
    await dataMapper.deleteByColumnValue(
      this.constructor.tableName,
      'id',
      request.params.id,
    );
    return response.status(204);
  }
}
module.exports = new RecruitmentController();
