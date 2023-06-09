const Joi = require('joi');

const recruitmentValidation = Joi.object({
  user_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  message: Joi.string().required(),
  external_link: Joi.string().uri(),
}).required.min(5);

module.exports = { recruitmentValidation };
