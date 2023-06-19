const Joi = require('joi');

const createCalendar = Joi.object({
  event_name: Joi.string().required(),
  event_date: Joi.string().required(),
  adversary_name: Joi.string().required(),
  adversary_name_short: Joi.string().required(),
  replay_link: Joi.string(),
  live_link: Joi.string(),
  score: Joi.string(),
  image: Joi.string().required(),
  publication_date: Joi.string(),
}).required();

const modifyCalendar = Joi.object({
  event_name: Joi.string(),
  event_date: Joi.string(),
  adversary_name: Joi.string(),
  adversary_name_short: Joi.string(),
  replay_link: Joi.string(),
  live_link: Joi.string(),
  score: Joi.string(),
  image: Joi.string(),
  publication_date: Joi.string(),
}).required().min(1);

module.exports = { createCalendar, modifyCalendar };
