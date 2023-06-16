/* eslint-disable camelcase */
const debug = require('debug')('app:controllers:recruitController');
const uploadHandler = require('../middlewares/uploadHandler');
const dataMapper = require('../models/dataMapper');
/**
 * a recruitment type
 * @typedef {object} Recruitment
 * @property {number} id - a recruitment id
 * @property {string} user_name - recruitment user_name
 * @property {string} email - recruitment email
 * @property {string} first_name - recruitment first name
 * @property {string} last_name - recruitment last name
 * @property {string} message - recruitment message
 * @property {string} external_link - recruitment external link
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * POST /api/recruitment
 * @summary insert recruitment
 * @tags Recruitment
 * @returns {object} 200 - success message
 * @returns {object} 400 - bad request
 */
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
