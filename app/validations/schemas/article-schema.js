const Joi = require('joi');

const createArticle = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  author_id: Joi.number().required(),
  image: Joi.string().required(),
  publication_date: Joi.string().required(),
  figcaption: Joi.string(),
}).required();

const modifyArticle = Joi.object({
  slug: Joi.string(),
  title: Joi.string(),
  content: Joi.string(),
  author_id: Joi.number(),
  image: Joi.string(),
  publication_date: Joi.string(),
  figcaption: Joi.string(),
}).required().min(1);

module.exports = { createArticle, modifyArticle };
