const Joi = require('joi');

const CreateArticle = Joi.object({
  slug: Joi.string().pattern(/^[a-z-]+$/),
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
  small_image: Joi.string().uri(),
  medium_image: Joi.string().uri(),
  large_image: Joi.string().uri(),
  figcaption: Joi.string(),
}).require();

const ModifyArticle = Joi.object({
  slug: Joi.string().pattern(/^[a-z-]+$/),
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
  small_image: Joi.string().uri(),
  medium_image: Joi.string().uri(),
  large_image: Joi.string().uri(),
  figcaption: Joi.string(),
}).require().min(1);

module.exports = { CreateArticle, ModifyArticle };
