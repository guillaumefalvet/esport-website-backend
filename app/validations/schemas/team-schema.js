const Joi = require('joi');

const createPlayerValidation = Joi.object({
  user_name: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  Description: Joi.string().required(),
  role: Joi.string(),
  small_image: Joi.string().required(),
  medium_image: Joi.string().required(),
  large_image: Joi.string().required(),
  statistics: Joi.string(),
  achievements: Joi.string(),
  youtube_link: Joi.string(),
  twitch_link: Joi.string(),
  twitter_link: Joi.string(),
}).required();

const modifyPlayerValidation = Joi.object({
  user_name: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  Description: Joi.string(),
  role: Joi.string(),
  small_image: Joi.string(),
  medium_image: Joi.string(),
  large_image: Joi.string(),
  statistics: Joi.string(),
  achievements: Joi.string(),
  youtube_link: Joi.string(),
  twitch_link: Joi.string(),
  twitter_link: Joi.string(),
}).required().min(1);

module.exports = { createPlayerValidation, modifyPlayerValidation };
