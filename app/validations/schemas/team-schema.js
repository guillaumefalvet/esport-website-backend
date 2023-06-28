const Joi = require('joi');

const createPlayer = Joi.object({
  user_name: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  description: Joi.string().required(),
  role: Joi.string(),
  statistics: Joi.string(),
  achievements: Joi.string(),
  youtube_link: Joi.string(),
  twitch_link: Joi.string(),
  twitter_link: Joi.string(),
}).required();

const modifyPlayer = Joi.object({
  user_name: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  description: Joi.string(),
  role: Joi.string(),
  statistics: Joi.string(),
  achievements: Joi.string(),
  youtube_link: Joi.string(),
  twitch_link: Joi.string(),
  twitter_link: Joi.string(),
}).required().min(1);

module.exports = { createPlayer, modifyPlayer };
