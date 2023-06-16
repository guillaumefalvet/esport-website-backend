const Joi = require('joi');

const createMedia = Joi.object({
  link: Joi.string().required(),
  is_active: Joi.boolean().required(),
}).required();

const modifyMedia = Joi.object({
  link: Joi.string(),
  is_active: Joi.string(),
}).required().min(1);

module.exports = { createMedia, modifyMedia };
