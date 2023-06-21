const debug = require('debug')('app:controllers:article');
const dataMapper = require('../models/dataMapper');
const CoreController = require('./CoreController');

const jsend = {
  status: 'success',
};
class ArticleController extends CoreController {
  static tableName = 'article';

  static tableNameView = 'article_events_categories_public';

  static columnName = 'slug';

  constructor() {
    super();
    debug('ArticleController created');
  }

  async getAllPublic(request, response) {
    const { home } = request.query;
    if (home === 'true') {
      debug(`get all public ${this.constructor.tableName} for homepage`);
      const results = await dataMapper.getAll('get_article_home');
      jsend.data = results;
      return response.status(200).json(jsend);
    }
    debug(`get all public ${this.constructor.tableName}`);
    const results = await dataMapper.getAll('article_events_categories_public');
    jsend.data = results;
    return response.status(200).json(jsend);
  }

  async getAllPrivate(_, response) {
    debug(`get all private ${this.constructor.tableName}`);
    const results = await dataMapper.getAll('article_events_categories_private');
    jsend.data = results;
    return response.status(200).json(jsend);
  }

  async createCalendarRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'calendar', 'id');
    if (createReference) {
      response.status(201).json(jsend);
    }
  }

  async createCategoryRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'category', 'id');
    if (createReference) {
      response.status(201).json(jsend);
    }
  }

  async deleteCalendarRelation(request, response, next) {
    await this.deleteReference(request, next, 'calendar', 'id');
    return response.status(204).send();
  }

  async deleteCategoryRelation(request, response, next) {
    await this.deleteReference(request, next, 'category', 'id');
    return response.status(204).send();
  }
}

module.exports = new ArticleController();
