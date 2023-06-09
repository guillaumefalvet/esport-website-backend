const Joi = require('joi');

const createArticle = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  small_image: Joi.string().uri().required(),
  medium_image: Joi.string().uri().required(),
  large_image: Joi.string().uri().required(),
  publication_date: Joi.string().required(),
  figcaption: Joi.string(),
}).require();

const modifyArticle = Joi.object({
  slug: Joi.string(),
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
  small_image: Joi.string().uri(),
  medium_image: Joi.string().uri(),
  large_image: Joi.string().uri(),
  publication_date: Joi.string(),
  figcaption: Joi.string(),
}).require().min(1);

module.exports = { createArticle, modifyArticle };
