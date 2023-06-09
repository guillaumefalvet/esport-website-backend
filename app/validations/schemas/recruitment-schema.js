const Joi = require('joi');

const recruitmentValidation = Joi.object({
  user_name: Joi.string(),
  email: Joi.string().email(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  message: Joi.string(),
  external_link: Joi.string().uri(),
}).required.min(6);

module.exports = { recruitmentValidation };
