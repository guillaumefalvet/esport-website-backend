/* eslint-disable max-len */
const debug = require('debug')('app:controllers:recruitment');
const fs = require('fs');
const handlebars = require('handlebars');
const uploadService = require('../services/uploadService');
const dataMapper = require('../models/dataMapper');
const { createRecruitment } = require('../validations/schemas/recruitment-schema');
const CoreController = require('./CoreController');
const mailingService = require('../services/mailingService');

const API_URL = process.env.API_URL ?? '';
const adminMail = process.env.EMAIL_ADDRESS;
const jsend = {
  status: 'success',
};
/**
 * @typedef {object} RecruitmentController
 * @property {function} insertRecruitment - Insert a recruitment entry.
 * @property {function} deleteRecruitment - Delete a recruitment entry.
 * @property {function} reviewOne - Review one applicant.
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
  static columnName = 'email';

  /**
   * Name of the secondary column used for recruitment.
   * @type {number}
   */
  static secondaryColumnName = 'id';

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
    debug(`${this.constructor.name} insertRecruitment`);
    const imageUpload = await uploadService(request, 'private', 'recruitment', 'cv', next, createRecruitment, 2);
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
      updatedData.email,
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
    const data = {
      ...updatedData,
      path: imageUpload.path,
    };

    const applicantTemplate = fs.readFileSync('./app/services/mailingService/templates/applicantTemplateApplying.hbs', 'utf8');
    const applicantHtml = handlebars.compile(applicantTemplate)(data);

    const adminTemplate = fs.readFileSync('./app/services/mailingService/templates/adminTemplate.hbs', 'utf8');
    const adminHtml = handlebars.compile(adminTemplate)(data);

    await mailingService(data, adminHtml, adminMail, 'ADMIN: Nouvelle candidature');
    await mailingService(data, applicantHtml, data.email, 'VictoryZone: Réception de votre candidature');
    return response.status(201).json(jsend);
  }

  /**
 * Review one applicant
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next function.
 * @returns {Object} The response object.
 */
  async reviewOne(request, response, next) {
    const findRecruitment = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.secondaryColumnName,
      request.params[this.constructor.secondaryColumnName],
    );
    if (!findRecruitment) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    request.body.id = request.params[this.constructor.secondaryColumnName];
    const data = {
      ...findRecruitment,
      ...request.body,
    };

    if (request.body.is_accepted) {
      debug('you passed !');
      const applicantTemplate = fs.readFileSync('./app/services/mailingService/templates/applicantTemplateIsAccepted.hbs', 'utf8');
      const applicantHtml = handlebars.compile(applicantTemplate)(data);
      await mailingService(data, applicantHtml, data.email, 'VictoryZone: Félicitation !');
      // send an email saying the person got accepted along message...
    } else {
      debug('you failed !');
      const applicantTemplate = fs.readFileSync('./app/services/mailingService/templates/applicantTemplateIsNotAccepted.hbs', 'utf8');
      const applicantHtml = handlebars.compile(applicantTemplate)(data);
      await mailingService(data, applicantHtml, data.email, 'VictoryZone: Peut-être une autre fois !');
      // send an email saying the person got rejected along message...
    }
    // request.body.is_reviewed = !request.body.is_reviewed;
    request.body.is_reviewed = true;
    const result = await dataMapper.modifyOne(this.constructor.tableName, request.body);
    jsend.data = result;
    // return response
    return response.status(200).json(jsend);
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
    debug(`${this.constructor.name} deleteRecruitment`);
    const findRecruitment = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.secondaryColumnName,
      request.params[this.constructor.secondaryColumnName],
    );
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
      this.constructor.secondaryColumnName,
      request.params[this.constructor.secondaryColumnName],
    );
    return response.status(204).send();
  }
}
module.exports = new RecruitmentController();
