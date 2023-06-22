/* eslint-disable max-len */
const debug = require('debug')('app:controllers:article');
const dataMapper = require('../models/dataMapper');
const CoreController = require('./CoreController');

const jsend = {
  status: 'success',
};
/**
 * @typedef {object} ArticleController
 * @property {function} getAllPublic - Get all public articles.
 * @property {function} getAllPrivate - Get all private articles.
 * @property {function} createCalendarRelation - Create a relation between an article and a calendar.
 * @property {function} createCategoryRelation - Create a relation between an article and a category.
 * @property {function} deleteCalendarRelation - Delete a relation between an article and a calendar.
 * @property {function} deleteCategoryRelation - Delete a relation between an article and a category.
 */

/**
 * ArticleController class
 * @class
 * @classdesc Controller for managing articles.
 * @extends CoreController
 */
class ArticleController extends CoreController {
  /**
   * Name of the table for articles.
   * @type {string}
   */
  static tableName = 'article';

  /**
   * Name of the view table for articles.
   * @type {string}
   */
  static tableNameView = 'article_events_categories_public';

  /**
   * Name of the column used as a unique identifier for articles.
   * @type {string}
   */
  static columnName = 'slug';

  /**
   * Name of the secondary column used for modifying articles.
   * @type {string}
   */
  static secondaryColumnName = 'id';

  /**
   * Create an instance of ArticleController.
   */
  constructor() {
    super();
    debug('ArticleController created');
  }

  /**
   * Get all public articles.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @returns {Array<Article>} 200 - Array of article objects
   * @returns {object} 500 - Internal server error
   */
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

  /**
   * Get all private articles.
   * @param {object} _ - The request object.
   * @param {object} response - The response object.
   * @returns {Array<Article>} 200 - Array of article objects
   * @returns {object} 500 - Internal server error
   */
  async getAllPrivate(_, response) {
    debug(`get all private ${this.constructor.tableName}`);
    const results = await dataMapper.getAll('article_events_categories_private');
    jsend.data = results;
    return response.status(200).json(jsend);
  }

  /**
   * Create a relation between an article and a calendar.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 201 - Success message if the relation is created successfully.
   */
  async createCalendarRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'calendar', 'id');
    if (createReference) {
      response.status(201).json(jsend);
    }
  }

  /**
   * Create a relation between an article and a category.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 201 - Success message if the relation is created successfully.
   */
  async createCategoryRelation(request, response, next) {
    const createReference = await this.createReference(request, next, 'category', 'id');
    if (createReference) {
      response.status(201).json(jsend);
    }
  }

  /**
   * Delete a relation between an article and a calendar.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 204 - Success message if the relation is deleted successfully.
   */
  async deleteCalendarRelation(request, response, next) {
    await this.deleteReference(request, next, 'calendar', 'id');
    return response.status(204).send();
  }

  /**
   * Delete a relation between an article and a category.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 204 - Success message if the relation is deleted successfully.
   */
  async deleteCategoryRelation(request, response, next) {
    await this.deleteReference(request, next, 'category', 'id');
    return response.status(204).send();
  }
}

module.exports = new ArticleController();
