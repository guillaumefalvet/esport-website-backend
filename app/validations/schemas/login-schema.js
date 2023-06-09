const Joi = require('joi');

const userValidation = Joi.object({
  user_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(),
  user_permission: Joi.number().integer,
}).required().min(3);

module.export = { userValidation };
