const Joi = require('joi');

const createRecruitment = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  message: Joi.string().required(),
  external_link: Joi.string().allow(null, ''),
  cv: Joi.string().allow(null, ''),
}).required();

const reviewRecruitment = Joi.object({
  is_accepted: Joi.boolean().required(),
  reviewer_comment: Joi.string().required(),
  reviewer_comment_private: Joi.string().required(),
}).required();

module.exports = { createRecruitment, reviewRecruitment };
