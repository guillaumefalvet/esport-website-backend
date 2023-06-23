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
/**
 * @typedef {object} RecruitmentController
 * @property {function} insertRecruitment - Insert a recruitment entry.
 * @property {function} deleteRecruitment - Delete a recruitment entry.
 */

/**
 * RecruitmentController class
 * @class
 * @classdesc Controller for managing recruitment data.
 * @extends CoreController
 */
class RecruitmentController extends CoreController {
  /**
   * Name of the table for recruitement.
   * @type {string}
   */
  static tableName = 'recruitment';

  /**
   * Name of the view table for recruitement.
   * @type {string}
   */
  static columnName = 'user_name';

  /**
   * Create an instance of RecruitmentController.
   */
  constructor() {
    super();
    debug('RecruitmentController created');
  }

  /**
 * Insert recruitment data.
 *
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 * @param {Function} next - Express next function.
 * @returns {Array<Recruitement>} - JSON response with inserted recruitment data.
 * @throws {Error} - If there is an error during the recruitment creation process.
 */
  async insertRecruitment(request, response, next) {
    const imageUpload = await uploadHandler(request, 'private', 'pdf', 'cv', next, createRecruitment);
    const updatedData = {
      ...request.body,
    };
    if (!imageUpload.path.length) {
      const error = new Error();
      debug('validation error missing file');
      error.code = 422;
      error.message = 'cv';
      return next(error);
    }
    updatedData.cv = `${API_URL}${imageUpload.path}`;
    const alradyExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      updatedData.user_name,
    );
    if (alradyExist) {
      // if the recruitment already exist in the database
      // delete the uploaded file that was just sent, doesn't affect the one that already exist
      fs.unlinkSync(`./${imageUpload.path}`);
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    const result = await dataMapper.createOne(this.constructor.tableName, updatedData);
    debug('Recruitment created successfully');
    jsend.data = result;
    return response.status(201).json(jsend);
  }

  /**
 * Delete recruitment data.
 *
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 * @param {Function} next - Express next function.
 * @returns {object} 200 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - Not Found error
 * @throws {Error} - If the recruitment data to be deleted is not found or there is an error during deletion.
 */
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
    if (findRecruitment.cv.length) {
      // verification si il n'est pas vide
      const fileToDelete = findRecruitment.cv.split(API_URL);
      fs.unlinkSync(`./${fileToDelete[1]}`);
      debug('local file deleted');
    }
    await dataMapper.deleteByColumnValue(
      this.constructor.tableName,
      'id',
      request.params.id,
    );
    return response.status(204).send();
  }
}
module.exports = new RecruitmentController();
