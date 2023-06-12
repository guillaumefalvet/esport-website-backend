const debug = require('debug')('app:controllers:recruitController');
const dataMapper = require('../models/dataMapper');

module.exports = {
  async createRecruitment(request, response) {
    // INSERT INTO DB
    // const { email } = request.body;
    const result = await dataMapper.createOne('recruitment', request.body);
    // SENDS A MESSAGE TO ADMIN
    // await mailService.admin(CONTEXT);
    // SENDS A MSG TO THE RECRUIT WITH HIS request.body.email
    // await mailService.send(email);
    response.status(201).json(result);
    debug('Recruitment created successfully');
  },
};
