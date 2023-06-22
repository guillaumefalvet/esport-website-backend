const debug = require('debug')('app:controllers:category');
const CoreController = require('./CoreController');
/**
 * @typedef {object} CategoryController
 */

/**
 * CategoryController class
 * @class
 * @classdesc Controller for managing categories.
 * @extends CoreController
 */
class CategoryController extends CoreController {
  /**
   * Name of the table for categories.
   * @type {string}
   */
  static tableName = 'category';

  /**
   * Name of the column used as a unique identifier for categories.
   * @type {string}
   */
  static columnName = 'id';

  /**
   * Create an instance of CategoryController.
   */
  constructor() {
    super();
    debug('CategoryController created');
  }
}

module.exports = new CategoryController();
