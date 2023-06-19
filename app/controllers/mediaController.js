/* eslint-disable camelcase */
const debug = require('debug')('app:controllers:mediaController');
const fs = require('fs');
const dataMapper = require('../models/dataMapper');
const uploadService = require('../services/uploadService');
const { createMedia } = require('../validations/schemas/media-schema');

const API_URL = process.env.API_URL ?? '';
const tableName = 'media';
const jsend = {
  status: '',
  data: '',
};
module.exports = {
  async getAll(request, response) {
    debug(`getAll ${tableName}`);
    debug(request.query);
    // check the type of the query, false for photo.
    if (request.query.type === 'photo') {
      const result = await dataMapper.getByType(false);
      jsend.status = 'success';
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    // check the type of the query, true for video.
    if (request.query.type === 'video') {
      const result = await dataMapper.getByType(true);
      jsend.data = result;
      return response.status(200).json(jsend);
    }
    //  if no query type
    const results = await dataMapper.getAll(tableName);
    jsend.data = results;

    return response.status(200).json(jsend);
  },

  async insertOne(request, response, next) {
    try {
      debug(`insertOne ${tableName}`);
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
      const result = await dataMapper.createOne(tableName, updatedData);
      jsend.status = 'success';
      jsend.data = result;
      return response.status(201).json(jsend);
    } catch (error) {
      debug('error while uploading');
      return next(error);
    }
  },

  async deleteOne(request, response, next) {
    debug(` deleteOne ${tableName}`);
    const { id } = request.params;
    const findMedia = await dataMapper.getByPk(tableName, id);
    if (!findMedia.length) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    if (!findMedia[0].is_active) { // if = false
      // delete locally
      const removed_url = findMedia[0].link.split(API_URL);
      fs.unlinkSync(`./${removed_url[1]}`);
      debug('FS: media deleted ');
    }
    await dataMapper.deleteByPk(tableName, id);
    return response.status(204);
  },
};
