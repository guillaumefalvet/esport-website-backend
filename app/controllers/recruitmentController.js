const debug = require('debug')('app:controllers:recruitController');
const uploadHandler = require('../middlewares/uploadHandler');
const dataMapper = require('../models/dataMapper');
const { createRecruitment } = require('../validations/schemas/recruitment-schema');

const API_URL = process.env.API_URL ?? '';

module.exports = {
  async insertOne(request, response, next) {
    try {
      const imageUpload = await uploadHandler(request, 'private', 'pdf', 'cv', next);
      const updatedData = {
        ...request.body,
        external_link: API_URL + imageUpload.path,
      };
      await createRecruitment.validateAsync(updatedData);
      debug(updatedData);
      const result = await dataMapper.createOne('recruitment', updatedData);
      debug('Recruitment created successfully');
      return response.status(201).json(result);
    } catch (err) {
      debug('Error while creating recruitment', err);
      return next(err);
    }
  },
};
