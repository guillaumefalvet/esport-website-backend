const Joi = require('joi');

const createPlayerValidation = Joi.object({
  user_name: Joi.string().min(3).max(30).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  Description: Joi.string().required(),
  role: Joi.string(),
  small_image: Joi.string().uri().required(),
  medium_image: Joi.string().uri().required(),
  large_image: Joi.string().uri().required(),
  statistics: Joi.string(),
  achievements: Joi.string(),
  youtube_link: Joi.string().uri(),
  twitch_link: Joi.string().uri(),
  twitter_link: Joi.string().uri(),
}).required();

const modifyPlayerValidation = Joi.object({
  user_name: Joi.string().min(3),
  first_name: Joi.string(),
  last_name: Joi.string(),
  Description: Joi.string(),
  role: Joi.string(),
  small_image: Joi.string().uri(),
  medium_image: Joi.string().uri(),
  large_image: Joi.string().uri(),
  statistics: Joi.string(),
  achievements: Joi.string(),
  youtube_link: Joi.string().uri(),
  twitch_link: Joi.string().uri(),
  twitter_link: Joi.string().uri(),
}).required().min(1);

module.exports = { createPlayerValidation, modifyPlayerValidation };
