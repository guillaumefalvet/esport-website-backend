const Joi = require('joi');

const createArticle = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  small_image: Joi.string().required(),
  medium_image: Joi.string().required(),
  large_image: Joi.string().required(),
  publication_date: Joi.string().required(),
  figcaption: Joi.string(),
}).required();

const modifyArticle = Joi.object({
  slug: Joi.string(),
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
  small_image: Joi.string(),
  medium_image: Joi.string(),
  large_image: Joi.string(),
  publication_date: Joi.string(),
  figcaption: Joi.string(),
}).required().min(1);

module.exports = { createArticle, modifyArticle };
