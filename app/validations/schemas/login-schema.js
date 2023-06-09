const Joi = require('joi');

const userValidation = Joi.object({
  user_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),

  // doit contenir au moins un chiffre, une lettre majuscule et une lettre minuscule//
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  user_permission: Joi.number().integer(),
}).required();

module.export = { userValidation };
