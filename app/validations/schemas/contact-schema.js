const Joi = require('joi');

const createContact = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  copy: Joi.boolean().required(),
});

module.exports = { createContact };
