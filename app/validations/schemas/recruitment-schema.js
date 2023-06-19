const Joi = require('joi');

const createRecruitment = Joi.object({
  user_name: Joi.string().required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  message: Joi.string().required(),
  external_link: Joi.string().allow(''),
}).required();

module.exports = { createRecruitment };
