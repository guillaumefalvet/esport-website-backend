const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3).max(20),
}).required();

const refreshToken = Joi.object({
  refreshToken: Joi.string().required(),
}).required();

module.exports = { loginValidation, refreshToken };
