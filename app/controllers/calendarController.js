const debug = require('debug')('app:controllers:calendar');
const dataMapper = require('../models/dataMapper');
const CoreController = require('./CoreController');

const jsend = {
  status: 'success',
};
/**
 * @typedef {object} CalendarController
 * @property {function} getAllCalendar - Get all calendars.
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
   * @type {string}
   */
  static columnName = 'id';

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
      const results = await dataMapper.getAll('get_calendar_home');
      jsend.data = results[0].data;
      jsend.status = 'success';
      return response.status(200).json(jsend);
    }
    debug(`get all ${this.constructor.name}`);
    const results = await dataMapper.getAll('get_all_calendar');
    jsend.status = 'success';
    jsend.data = results[0].data;
    return response.status(200).json(jsend);
  }
}

module.exports = new CalendarController();
