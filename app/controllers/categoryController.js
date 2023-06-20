const debug = require('debug')('app:controllers:category');
const CoreController = require('./CoreController');

class CategoryController extends CoreController {
  static tableName = 'category';

  static columnName = 'id';

  constructor() {
    super();
    debug('CategoryController created');
  }
}

module.exports = new CategoryController();
