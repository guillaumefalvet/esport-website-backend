/* eslint-disable camelcase */
const debug = require('debug')('app:controllers:recruitController');
const uploadHandler = require('../middlewares/uploadHandler');
const dataMapper = require('../models/dataMapper');

module.exports = {
  async insertOne(request, response, next) {
    const image_upload = await uploadHandler(request, 'private', 'pdf', 'cv', next);

    debug(request.file);
    request.body.external_link = image_upload.path;
    debug(request.body);
    const result = await dataMapper.createOne('recruitment', request.body);
    debug('Recruitment created successfully');
    return response.status(201).json(result);
  },
};
