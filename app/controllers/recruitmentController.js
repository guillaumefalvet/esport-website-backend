const debug = require('debug')('app:controllers:recruitController');
const uploadHandler = require('../services/uploadService');
const dataMapper = require('../models/dataMapper');
const { createRecruitment } = require('../validations/schemas/recruitment-schema');

const API_URL = process.env.API_URL ?? '';
const tableName = 'recruitment';
const jsend = {
  status: '',
  data: '',
};
module.exports = {
  async getAll(_, response) {
    debug(`get all ${tableName}`);
    const results = await dataMapper.getAll(tableName);
    jsend.data = results;
    jsend.status = 'success';
    return response.status(200).json(jsend);
  },
  async insertOne(request, response, next) {
    try {
      const imageUpload = await uploadHandler(request, 'private', 'pdf', 'cv', next);
      const updatedData = {
        ...request.body,
        external_link: API_URL + imageUpload.path,
      };
      await createRecruitment.validateAsync(updatedData);
      const result = await dataMapper.createOne('recruitment', updatedData);
      debug('Recruitment created successfully');
      return response.status(201).json(result);
    } catch (err) {
      debug('Error while creating recruitment', err);
      return next(err);
    }
  },
  async deleteOne(request, response, next) {
    debug(`deleteOne: ${tableName}`);
    const { id } = request.params;
    const findRecruitment = await dataMapper.getByPk(tableName, id);
    if (findRecruitment.length === 0) {
      const error = new Error();
      error.code = 404;
      return next(error);
    }
    await dataMapper.deleteByPk(tableName, id);
    return response.status(204);
  },
};
