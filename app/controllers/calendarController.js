const debug = require('debug')('app:controllers:calendar');
const fs = require('fs');
const dataMapper = require('../models/dataMapper');
const CoreController = require('./CoreController');
const uploadService = require('../services/uploadService');
const { createCalendar, modifyCalendar } = require('../validations/schemas/calendar-schema');

const API_URL = process.env.API_URL ?? '';
const jsend = {
  status: 'success',
};
/**
 * @typedef {object} CalendarController
 * @property {function} getAllCalendar - Get all calendars.
* @property {function} uploadOne - Uploads a single calendar with an image.
 * @property {function} modifyUploadedOne - Modifies an uploaded calendar with an image.
 * @property {function} deleteUploadedOne - Deletes an uploaded calendar with its associated image.
 */

/**
 * CalendarController class
 * @class
 * @classdesc Controller for managing calendars.
 * @extends CoreController
 */
class CalendarController extends CoreController {
  /**
   * Name of the table for calendars.
   * @type {string}
   */
  static tableName = 'calendar';

  /**
   * Name of the column used as a unique identifier for calendars.
   * @type {number}
   */
  static columnName = 'id';

  /**
   * Name of the secondary column used for calendar.
   * @type {string}
   */
  static secondaryColumnName = 'event_name';

  /**
   * Create an instance of CalendarController.
   */
  constructor() {
    super();
    debug('CalendarController created');
  }

  /**
   * Get all calendars.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @returns {Array<Calendar>} 200 - success response
   * @returns {object} 500 - Internal server error
   */
  async getAllCalendar(request, response) {
    const { home } = request.query;
    if (home === 'true') {
      debug(`get homepage ${this.constructor.name}`);
      const results = await dataMapper.getAll('calendar_home_view');
      jsend.data = results[0].data;
      jsend.status = 'success';
      return response.status(200).json(jsend);
    }
    debug(`get all ${this.constructor.name}`);
    const results = await dataMapper.getAll('calendar_view');
    jsend.status = 'success';
    jsend.data = results[0].data;
    return response.status(200).json(jsend);
  }

  /**
 * Uploads a single player with an image.
 *
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
  async uploadOne(request, response, next) {
    debug(`${this.constructor.name} uploadOne`);
    const imageUpload = await uploadService(request, 'public', 'calendar', 'image', next, createCalendar, 3);
    const parsedData = {
      ...request.body,
    };
    // if no image was uploaded
    if (!imageUpload.path.length) {
      const error = new Error();
      debug('validation error missing file');
      error.code = 422;
      error.message = 'image';
      return next(error);
    }
    // check if it doesn't exist in database
    const alradyExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.secondaryColumnName,
      parsedData[this.constructor.secondaryColumnName],
    );
    debug(alradyExist);
    if (alradyExist) {
    // delete staged file
      fs.unlinkSync(`./${imageUpload.path}`);
      const error = new Error();
      error.code = 303;
      return next(error);
    }
    parsedData.image = `${API_URL}${imageUpload.path}`;
    const result = await dataMapper.createOne(this.constructor.tableName, parsedData);
    jsend.data = result;
    return response.status(201).json(jsend);
  }

  /**
* Modifies a player with an image.
*
* @param {Object} request - The request object.
* @param {Object} response - The response object.
* @param {Function} next - The next middleware function.
* @returns {Object} The response object.
*/
  async modifyUploadedOne(request, response, next) {
    debug(`${this.constructor.name} modifyUploadedOne`);
    // call uploadService to parse the data
    const imageUpload = await uploadService(request, 'public', 'calendar', 'image', next, modifyCalendar, 3);
    const parsedData = {
      ...request.body,
    };
    // check if the article exist in the database (SEARCH BY ID=> secondaryColumnName) => 404
    const doesExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );
    debug(doesExist);
    // if no article in database
    if (!doesExist) {
      const error = new Error();
      error.code = 404;
      // if there was an image in the request
      if (imageUpload.path.length) {
      //= > FS: delete the staged file if there is one
        fs.unlinkSync(`./${imageUpload.path}`);
      }
      // 404
      return next(error);
    }
    if (imageUpload.path.length) {
    // if there is an image
    // => FS: delete the old on from db
      const fileToDelete = doesExist.image.split(API_URL);
      fs.unlinkSync(`./${fileToDelete[1]}`);
      // store the new image in an object
      parsedData.image = `${API_URL}${imageUpload.path}`;
    }
    parsedData[this.constructor.columnName] = request.params[this.constructor.columnName];
    // call modifyOne
    const result = await dataMapper.modifyOne(this.constructor.tableName, parsedData);
    jsend.data = result;
    // return response
    return response.status(200).json(jsend);
  }

  /**
* Deletes an uploaded article with its associated image.
*
* @param {Object} request - The request object.
* @param {Object} response - The response object.
* @param {Function} next - The next middleware function.
* @returns {Object} The response object.
*/
  async deleteUploadedOne(request, response, next) {
    debug(`${this.constructor.name} deleteUploadedOne`);
    // check if the article exist in the database
    const doesExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );

    // if article in database
    if (!doesExist) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    // => FS: delete the image from db
    const fileToDelete = doesExist.image.split(API_URL);
    fs.unlinkSync(`./${fileToDelete[1]}`);
    // call delete
    await dataMapper.deleteByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );
    // return response 204
    return response.status(204).send();
  }
}

module.exports = new CalendarController();
