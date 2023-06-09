const Joi = require('joi');

const CreateArticle = Joi.object({
  slug: Joi.string(),
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
  small_image: Joi.string(),
  medium_image: Joi.string(),
  large_image: Joi.string(),
  figcaption: Joi.string(),
}).require();

const ModifyArticle = Joi.object({
  slug: Joi.string(),
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
  small_image: Joi.string(),
  medium_image: Joi.string(),
  large_image: Joi.string(),
  figcaption: Joi.string(),
}).require();

module.exports = {
  CreateArticle,
  ModifyArticle,
};
