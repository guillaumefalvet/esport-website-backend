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

class MediaController extends CoreController {
  static tableName = 'media';

  static columnName = 'id';

  constructor() {
    super();
    debug('mediaController created');
  }

  async getAllMedia(request, response) {
    debug(`${this.constructor.name} get all`);
    if (request.query.type === 'photo') {
      debug('photo');
      const result = await dataMapper.getByColumnValue(this.constructor.tableName, 'is_active', false);
      jsend.status = 'success';
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    if (request.query.type === 'video') {
      debug('video');
      const result = await await dataMapper.getByColumnValue(this.constructor.tableName, 'is_active', true);
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    const results = await dataMapper.getAll(this.constructor.tableName);
    jsend.data = results;

    return response.status(200).json(jsend);
  }

  async insertMedia(request, response, next) {
    try {
      debug(`${this.constructor.name} insertMedia`);
      const imageUpload = await uploadService(request, 'public', 'image', 'img', next);
      const updatedData = {};
      if (!imageUpload.path.length) {
        debug('no image uploaded');
        updatedData.link = request.body.link;
        updatedData.is_active = true;
      } else {
        debug('image was uploaded');
        updatedData.link = `${API_URL}${imageUpload.path}`;
        updatedData.is_active = false;
      }
      await createMedia.validateAsync(updatedData);
      const result = await dataMapper.createOne(this.constructor.tableName, updatedData);
      jsend.data = result;
      return response.status(201).json(jsend);
    } catch (error) {
      debug('error while uploading');
      return next(error);
    }
  }

  async deleteMedia(request, response, next) {
    debug(`${this.constructor.name} deleteMedia`);
    const findMedia = await dataMapper.getByColumnValue(this.constructor.tableName, this.constructor.columnName, request.params[this.constructor.columnName]);
    if (!findMedia) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    if (!findMedia.is_active) { // if = false
      // delete locally
      const localFile = findMedia.link.split(API_URL);
      fs.unlinkSync(`./${localFile[1]}`);
      debug('FS: media deleted ');
    }
    await dataMapper.deleteByColumnValue(this.constructor.tableName, this.constructor.columnName, request.params[this.constructor.columnName]);
    return response.status(204);
  }
}
module.exports = new MediaController();
