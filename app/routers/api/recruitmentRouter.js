const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { createRecruitement } = require('../../validations/schemas');
const validate = require('../../validations');
const { recruitmentController } = require('../../controllers');

const router = express.Router();
/**
 * a recruitment type
 * @typedef {object} Recruitment
 * @property {number} id - a recruitment id
 * @property {string} user_name - recruitment user_name
 * @property {string} email - recruitment email
 * @property {string} first_name - recruitment first name
 * @property {string} last_name - recruitment last name
 * @property {string} message - recruitment message
 * @property {string} external_link - recruitment external link
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * POST /api/recruitment
 * @summary insert recruitment
 * @tags recruitment
 * @returns {object} 200 - success message
 * @returns {object} 400 - bad request
 */

router.post('/recruitment', validate(createRecruitement), controllerHandler(recruitmentController.createOne));

module.exports = router;
