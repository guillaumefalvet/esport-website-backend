const Joi = require('joi');

const createArticle = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  publication_date: Joi.string().required(),
  figcaption: Joi.string().allow(null, ''),
}).required();

const modifyArticle = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  publication_date: Joi.string(),
  figcaption: Joi.string(),
}).required().min(1);

module.exports = { createArticle, modifyArticle };
