const Joi = require('joi');

const userValidation = Joi.object({
  user_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  user_permission: Joi.number().integer(),
}).required();

module.export = { userValidation };
