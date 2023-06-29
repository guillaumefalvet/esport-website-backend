/* eslint-disable max-len */
const debug = require('debug')('app:controllers:article');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dataMapper = require('../models/dataMapper');
const CoreController = require('./CoreController');
const { createArticle, modifyArticle } = require('../validations/schemas/article-schema');
const uploadService = require('../services/uploadService');

const { JWT_SECRET } = process.env;

const API_URL = process.env.API_URL ?? '';

const jsend = {
  status: 'success',
};
/**
 * @typedef {object} ArticleController
 * @property {function} getAllPublic - Get all public articles.
 * @property {function} getAllPrivate - Get all private articles.
 * @property {function} getOnePrivate - Get one private articles.
 * @property {function} uploadOne - Uploads a single article with an image.
 * @property {function} modifyUploadedOne - Modifies an uploaded article with an image.
 * @property {function} deleteUploadedOne - Deletes an uploaded article with its associated image.
 * @property {function} createCategoryRelation - Create a relation between an article and a category.
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
  static tableNameView = 'article_public_view';

  /**
   * Name of the column used as a unique identifier for articles.
   * @type {string}
   */
  static columnName = 'slug';

  /**
   * Name of the secondary column used for articles.
   * @type {number}
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
      /**
       * Extracts the first 14 words from a given text using a regular expression.
       *
       * @param {string} text - The input text from which to extract the words.
       * @returns {string} The first 14 words extracted from the input text.
       *
       * @example
       * Using the regular expression in JavaScript
       * const regex = /((\S+\s*){1,14})(.*)/;
       * const limitedText = text.match(regex)[1];
       *
       * In SQL query
       * Explanation:
       * The regular expression ((\S+\s*){1,14})(.*) is used to extract the first 14 words from the given text. It captures the words using groups and discards any remaining text.
       * The SQL query SELECT regexp_replace(content, '((\S+\s*){1,14})(.*)', '\1') AS limited_text FROM your_table WHERE id = 1; can be used to apply the same extraction logic in a PostgreSQL database. It uses the regexp_replace function to capture the first 14 words and discard the rest.
       */
      debug(`get all public ${this.constructor.tableName} for homepage`);
      const results = await dataMapper.getAll('article_home_view');
      jsend.data = results;
      return response.status(200).json(jsend);
    }
    debug(`get all public ${this.constructor.tableName}`);
    const results = await dataMapper.getAll('article_public_view');
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
    const results = await dataMapper.getAll('article_private_view');
    jsend.data = results;
    return response.status(200).json(jsend);
  }

  /**
   * Get one private articles.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @returns {Array<Article>} 200 - Array of article objects
   * @returns {object} 500 - Internal server error
   */
  async getOnePrivate(request, response, next) {
    debug(`${this.constructor.name} getOnePrivate`);

    const result = await dataMapper.getByColumnValue(
      'article_private_view',
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );
    if (!result) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    jsend.data = result;
    return response.status(200).json(jsend);
  }

  /**
 * Uploads a single article with an image.
 *
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
  async uploadOne(request, response, next) {
    debug(`${this.constructor.name} uploadOne`);
    const imageUpload = await uploadService(request, 'public', 'article', 'img', next, createArticle, 3);
    const parsedData = {
      ...request.body,
    };
    // if no image was uploaded
    if (!imageUpload.path.length) {
      const error = new Error();
      debug('validation error missing file');
      error.code = 422;
      error.message = 'img';
      return next(error);
    }
    // check if it doesn't exist in database
    const alradyExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      'title',
      parsedData.title,
    );

    if (alradyExist) {
      // delete staged file
      fs.unlinkSync(`./${imageUpload.path}`);
      const error = new Error();
      error.code = 303;
      return next(error);
    }

    // gettting the user id
    const authHeader = request.headers.authorization;
    const accessToken = authHeader.split('Bearer ')[1];
    const decoded = jwt.verify(
      accessToken,
      JWT_SECRET,
      { ignoreExpiration: true },
    );
    parsedData.author_id = decoded.data.id;
    parsedData.image = `${API_URL}${imageUpload.path}`;
    const result = await dataMapper.createOne(this.constructor.tableName, parsedData);
    jsend.data = result;
    return response.status(201).json(jsend);
  }

  /**
 * Modifies an uploaded article with an image.
 *
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
  async modifyUploadedOne(request, response, next) {
    debug(`${this.constructor.name} modifyUploadedOne`);
    // call uploadService to parse the data
    const imageUpload = await uploadService(request, 'public', 'article', 'img', next, modifyArticle, 3);
    const parsedData = {
      ...request.body,
    };
    // check if the article exist in the database (SEARCH BY ID=> secondaryColumnName) => 404
    const doesExist = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.secondaryColumnName,
      request.params[this.constructor.secondaryColumnName],
    );
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
    // setting the id for the function sql to modify the article
    parsedData.id = request.params[this.constructor.secondaryColumnName];
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

  /**
   * Create a relation between an article and a category.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 201 - Success message if the relation is created successfully.
   */
  async createCategoryRelation(request, response, next) {
    debug(`${this.constructor.name} createCategoryRelation`);
    const createReference = await this.createReference(request, next, 'category', 'id');
    if (createReference) {
      response.status(201).json(jsend);
    }
  }

  /**
   * Delete a relation between an article and a category.
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 204 - Success message if the relation is deleted successfully.
   */
  async deleteCategoryRelation(request, response, next) {
    debug(`${this.constructor.name} deleteCategoryRelation`);
    await this.deleteReference(request, next, 'category', 'id');
    return response.status(204).send();
  }
}

module.exports = new ArticleController();
