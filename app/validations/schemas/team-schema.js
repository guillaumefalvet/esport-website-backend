const Joi = require('joi');

const createPlayerValidation = Joi.object({
  user_name: Joi.string().min(3).max(30).alphanum(),

  // contient uniquement les lettre de l'alphabet//
  first_name: Joi.string().pattern(/^[a-zA-Z\s]*$/).required(),
  last_name: Joi.string().pattern(/^[a-zA-Z\s]*$/).required(),
  Description: Joi.string(),
  role: Joi.string().optional(),
  small_image: Joi.string().uri(),
  medium_image: Joi.string().uri(),
  large_image: Joi.string().uri(),
  statistics: Joi.string().optional(),
  achievements: Joi.string(),
  youtube_link: Joi.string().uri().optional(),
  twitch_link: Joi.string().uri().optional(),
  twitter_link: Joi.string().uri().optional(),
}).required();

const modifyPlayerValidation = Joi.object({
  user_name: Joi.string().min(3),
  first_name: Joi.string().pattern(/^[a-zA-Z\s]*$/),
  last_name: Joi.string().pattern(/^[a-zA-Z\s]*$/),
  Description: Joi.string(),
  role: Joi.string().optional(),
  small_image: Joi.string().uri(),
  medium_image: Joi.string().uri(),
  large_image: Joi.string().uri(),
  statistics: Joi.string().optional(),
  achievements: Joi.string(),
  youtube_link: Joi.string().uri().optional(),
  twitch_link: Joi.string().uri().optional(),
  twitter_link: Joi.string().uri().optional(),
}).required().min(1);

module.exports = { createPlayerValidation, modifyPlayerValidation };
