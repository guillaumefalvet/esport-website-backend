const Joi = require('joi');

const createCalendar = Joi.object({
  event_name: Joi.string().required(),
  event_date: Joi.string().required(),
  adversary_name: Joi.string().required(),
  adversary_name_short: Joi.string().required(),
  replay_link: Joi.string().allow(null, ''),
  live_link: Joi.string().allow(null, ''),
  score: Joi.string().allow(null, ''),
}).required();

const modifyCalendar = Joi.object({
  event_name: Joi.string(),
  event_date: Joi.string(),
  adversary_name: Joi.string(),
  adversary_name_short: Joi.string(),
  replay_link: Joi.string(),
  live_link: Joi.string(),
  score: Joi.string(),
}).required().min(1);

module.exports = { createCalendar, modifyCalendar };
