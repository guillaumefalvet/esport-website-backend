const Joi = require('joi');

const createMedia = Joi.object({
  link: Joi.string().required(),
  is_active: Joi.boolean().required(),
}).required();

module.exports = { createMedia };
