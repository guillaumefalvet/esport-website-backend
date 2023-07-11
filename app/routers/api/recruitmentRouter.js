/* eslint-disable max-len */
const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const recruitController = require('../../controllers/recruitmentController');
const { authorizeAccess } = require('../../middlewares/authHandler');
const { reviewRecruitment } = require('../../validations/schemas/recruitment-schema');
const validate = require('../../validations/validate');
const rateLimitHander = require('../../middlewares/rateLimitHandler');

const router = express.Router();
/**
 * @typedef {object} Recruitment - A recruitment type.
 * @property {string} email.required - The recruitment email.
 * @property {string} first_name.required - The recruitment first name.
 * @property {string} last_name.required - The recruitment last name.
 * @property {string} message.required - The recruitment message.
 * @property {string} external_link - the recruitment optional external link
 * @property {string} cv - the recruitment optional external file. - binary
 */

/**
 * POST /api/recruitment
 * @summary submit an application
 * @tags Recruitment
 * @param {Recruitment} request.body.required - The recruitment object to insert - multipart/form-data
 * @returns {object} 201 - Success message
 * @returns {object} 400 - Bad request
 */
router.post('/', rateLimitHander, controllerHandler(recruitController.insertRecruitment.bind(recruitController)));

/**
 * GET /api/recruitment
 * @summary Get all recruitment applications
 * @tags Recruitment
 * @security BearerAuth
 * @returns {Array<Recruitment>} 200 - Array of recruitment applications
 * @returns {object} 403 - Forbidden
 */
router.get('/', authorizeAccess(1), controllerHandler(recruitController.getAll.bind(recruitController)));

/**
 * PATCH /api/recruitment/:id
 * @summary review a recruitment applications
 * @tags Recruitment
 * @param {number} id.path - The ID of the person
 * @security BearerAuth
 * @returns {Array<Recruitment>} 200 - Array of recruitment applications
 * @returns {object} 403 - Forbidden
 */
router.patch('/:id(\\d+)', authorizeAccess(1), validate(reviewRecruitment), controllerHandler(recruitController.reviewOne.bind(recruitController)));

/**
 * DELETE /api/recruitment/:id
 * @summary Delete a recruitment application by ID
 * @tags Recruitment
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the recruitment application to delete
 * @returns {object} 200 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - Not Found error
*/
router.delete('/:id(\\d+)', authorizeAccess(1), controllerHandler(recruitController.deleteRecruitment.bind(recruitController)));
module.exports = router;
