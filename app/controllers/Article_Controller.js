const debug = require('debug')('app:controllers:article');
const CoreController = require('./CoreController');

class ArticleController extends CoreController {
  static tableName = 'article';

  static columnName = 'slug';

  static paramsLink = 'slug';

  /**
   * create a category controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    debug('ArticleController created');
  }
}

module.exports = new ArticleController();
