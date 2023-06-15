const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const refreshToken = Joi.object({
  refreshToken: Joi.string().required(),
}).required();

module.exports = { loginValidation, refreshToken };
