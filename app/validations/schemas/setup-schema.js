const Joi = require('joi');

const createSetup = Joi.object({
  name: Joi.string().required(),
  external_link: Joi.string().required(),
}).required();

const modifySetup = Joi.object({
  name: Joi.string(),
  external_link: Joi.string(),
}).required().min(1);

module.exports = { createSetup, modifySetup };
