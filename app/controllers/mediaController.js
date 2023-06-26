/* eslint-disable max-len */
const debug = require('debug')('app:controllers:media');
const fs = require('fs');
const dataMapper = require('../models/dataMapper');
const uploadService = require('../services/uploadService');
const { createMedia } = require('../validations/schemas/media-schema');
const CoreController = require('./CoreController');

const API_URL = process.env.API_URL ?? '';

const jsend = {
  status: 'success',
};
/**
 * @typedef {object} MediaController
 */

/**
 * MediaController class
 * @class
 * @classdesc Controller for managing media.
 * @extends CoreController
 */
class MediaController extends CoreController {
  /**
   * Name of the table for media.
   * @type {string}
   */
  static tableName = 'media';

  /**
   * Name of the column used as a unique identifier for media.
   * @type {string}
   */
  static columnName = 'id';

  /**
   * Create an instance of MediaController.
   */
  constructor() {
    super();
    debug('mediaController created');
  }

  /**
   * Get all media.
   * @param {Object} request - Express request object.
   * @param {Object} response - Express response object.
   * @returns {Array} 200 - An array of media objects matching the specified filter
   * @returns {object} 500 - Internal server error
   */
  async getAllMedia(request, response) {
    debug(`${this.constructor.name} get all`);
    if (request.query.type === 'photo') {
      debug('photo');
      const result = await dataMapper.getByType(false);
      jsend.status = 'success';
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    if (request.query.type === 'video') {
      debug('video');
      const result = await await dataMapper.getByType(true);
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    const results = await dataMapper.getAll(this.constructor.tableName);
    jsend.data = results;

    return response.status(200).json(jsend);
  }

  /**
   * Insert media.
   * @param {Object} request - Express request object.
   * @param {Object} response - Express response object.
   * @param {Function} next - Express next function.
   * @returns {object} 201 - Success message
   * @returns {object} 403 - Forbidden
   * @returns {object} 400 - Bad request
   * @throws {Error} If there is an error during the upload process.
   */
  async insertMedia(request, response, next) {
    try {
      debug(`${this.constructor.name} insertMedia`);

      // Upload the image using the uploadService
      const imageUpload = await uploadService(request, 'public', 'image', 'img', next, createMedia, 2);

      // Prepare the updated data for media insertion
      const updatedData = { ...request.body };

      if (!imageUpload.path.length) {
        debug('no image uploaded');
        updatedData.is_active = true;
      } else {
        debug('image was uploaded');
        updatedData.link = `${API_URL}${imageUpload.path}`;
        updatedData.is_active = false;
      }

      // Create a new media entry in the database
      const result = await dataMapper.createOne(this.constructor.tableName, updatedData);

      jsend.data = result;

      return response.status(201).json(jsend);
    } catch (error) {
      debug('error while uploading');
      return next(error);
    }
  }

  /**
 * Delete media.
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 * @param {Function} next - Express next function.
 * @returns {object} 204 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - Not Found error
 * @throws {Error} If the media to be deleted is not found or there is an error during deletion.
 */
  async deleteMedia(request, response, next) {
    debug(`${this.constructor.name} deleteMedia`);

    // Find the media to be deleted
    const findMedia = await dataMapper.getByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );

    if (!findMedia) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }

    if (!findMedia.is_active) {
    // Delete the media file locally
      const localFile = findMedia.link.split(API_URL);
      fs.unlinkSync(`./${localFile[1]}`);
      debug('FS: media deleted');
    }

    // Delete the media entry from the database
    await dataMapper.deleteByColumnValue(
      this.constructor.tableName,
      this.constructor.columnName,
      request.params[this.constructor.columnName],
    );

    return response.status(204).send();
  }
}

module.exports = new MediaController();
