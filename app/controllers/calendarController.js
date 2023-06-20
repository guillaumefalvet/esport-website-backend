const debug = require('debug')('app:controllers:calendar');
const dataMapper = require('../models/dataMapper');
const CoreController = require('./CoreController');

const jsend = {
  status: 'success',
};

class CalendarController extends CoreController {
  static tableName = 'calendar';

  static columnName = 'id';

  constructor() {
    super();
    debug('CalendarController created');
  }

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
