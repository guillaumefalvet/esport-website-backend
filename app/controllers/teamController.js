/* eslint-disable max-len */
const debug = require('debug')('app:controllers:team');
const fs = require('fs');
const dataMapper = require('../models/dataMapper');
const CoreController = require('./CoreController');
const uploadService = require('../services/uploadService');
const { createPlayer, modifyPlayer } = require('../validations/schemas/team-schema');
const cachingService = require('../services/cachingService');

const API_URL = process.env.API_URL ?? '';
const jsend = {
  status: 'success',
};
/**
 * @typedef {object} TeamController
 * @property {function} uploadOne - Uploads a single team with an image.
 * @property {function} modifyUploadedOne - Modifies an uploaded team with an image.
 * @property {function} deleteUploadedOne - Deletes an uploaded team with its associated image.
 * @property {function} createMediaRelation - Create a relation between a team and a media entry.
 * @property {function} createSetupRelation - Create a relation between a team and a setup entry.
 * @property {function} deleteMediaRelation - Delete a relation between a team and a media entry.
 * @property {function} deleteSetupRelation - Delete a relation between a team and a setup entry.
 */

/**
 * TeamController class
 * @class
 * @classdesc Controller class for managing team-related operations.
 * @extends CoreController
 */
class TeamController extends CoreController {
  /**
   * Name of the table for team entries.
   * @type {string}
   */
  static tableName = 'player';

  /**
   * Name of the view table for team entries.
   * @type {string}
   */
  static tableNameView = 'player_view';

  /**
   * Name of the primary column in the team table.
   * @type {string}
   */
  static columnName = 'user_name';

  /**
   * Name of the secondary column in the team table.
   * @type {number}
   */
  static secondaryColumnName = 'id';

  /**
   * Constructs a new instance of the TeamController.
   */
  constructor() {
    super();
    debug('TeamController created');
  }

  /**
 * Retrieves all players.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Array} 200 - Success message
 */
  async getAllPlayer(request, response) {
    debug(`${this.constructor.name} getAllPlayer`);
    if (request.query.home === 'true') {
      debug('home');
      const cacheKey = 'player_home_view';
      let data = cachingService.getCache(cacheKey);
      if (!data) {
        data = await dataMapper.getAll(cacheKey);
        cachingService.setCache(cacheKey, data);
      }
      jsend.data = data;
      return response.status(200).json(jsend);
    }
    debug('all');
    const cacheKey = 'player_view';
    let data = cachingService.getCache(cacheKey);
    if (!data) {
      data = await dataMapper.getAll(cacheKey);
      cachingService.setCache(cacheKey, data);
    }
    jsend.data = data;
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
    const imageUpload = await uploadService(request, 'public', 'team', 'img', next, createPlayer, 3);
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
      this.constructor.columnName,
      parsedData[this.constructor.columnName],
    );
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
    cachingService.delCache(['player_view', 'player_home_view']);
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
    const imageUpload = await uploadService(request, 'public', 'team', 'img', next, modifyPlayer, 3);
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
    parsedData[this.constructor.secondaryColumnName] = request.params[this.constructor.secondaryColumnName];
    // call modifyOne
    const result = await dataMapper.modifyOne(this.constructor.tableName, parsedData);
    jsend.data = result;
    cachingService.delCache(['player_view', 'player_home_view']);
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

    cachingService.delCache(['player_view', 'player_home_view']);
    // return response 204
    return response.status(204).send();
  }

  /**
   * Create a relation between a team and a media entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 201 - Success message if the relation is created successfully.
   */
  async createMediaRelation(request, response, next) {
    debug(`${this.constructor.name} createMediaRelation`);
    await this.createReference(request, next, 'media', 'id');
    cachingService.delCache(['player_view', 'player_home_view']);
    response.status(201).json(jsend);
  }

  /**
   * Create a relation between a team and a setup entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 201 - Success message if the relation is created successfully.
   */
  async createSetupRelation(request, response, next) {
    debug(`${this.constructor.name} createSetupRelation`);
    await this.createReference(request, next, 'setup', 'id');
    cachingService.delCache(['player_view', 'player_home_view']);
    response.status(201).json(jsend);
  }

  /**
   * Delete a relation between a team and a media entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 204 - Success message if the relation is deleted successfully.
   */
  async deleteMediaRelation(request, response, next) {
    debug(`${this.constructor.name} deleteMediaRelation`);
    await this.deleteReference(request, next, 'media', 'id');
    cachingService.delCache('player_view');
    cachingService.delCache('player_home_view');
    return response.status(204).send();
  }

  /**
   * Delete a relation between a team and a setup entry.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   * @returns {Array} 204 - Success message if the relation is deleted successfully.
   */
  async deleteSetupRelation(request, response, next) {
    debug(`${this.constructor.name} deleteSetupRelation`);
    await this.deleteReference(request, next, 'setup', 'id');
    cachingService.delCache(['player_view', 'player_home_view']);
    return response.status(204).send();
  }
}

module.exports = new TeamController();
