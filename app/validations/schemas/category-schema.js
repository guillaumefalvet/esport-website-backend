const Joi = require('joi');

const createCategory = Joi.object({
  label: Joi.string().required(),
}).required();

const modifyCategory = Joi.object({
  label: Joi.string(),
}).required().min(1);

module.exports = { createCategory, modifyCategory };
