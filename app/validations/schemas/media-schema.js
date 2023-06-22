const Joi = require('joi');

const createMedia = Joi.object({
  link: Joi.string().allow(null, ''),
}).required();

module.exports = { createMedia };
