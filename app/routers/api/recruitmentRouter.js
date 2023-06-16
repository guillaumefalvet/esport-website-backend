const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
// const { recruitmentValidation } = require('../../validations/schemas/recruitment-schema');
// const validate = require('../../validations/validate');
const recruitController = require('../../controllers/recruitmentController');
const { authorizeAccess } = require('../../middlewares/authHandler');

/**
 * @typedef {object} Recruitment - A recruitment type.
 * @property {string} user_name.required - The recruitment user name.
 * @property {string} email.required - The recruitment email.
 * @property {string} first_name.required - The recruitment first name.
 * @property {string} last_name.required - The recruitment last name.
 * @property {string} message.required - The recruitment message.
 * @property {string} cv - The recruitment external link. - binary
 */

/**
 * POST /api/recruitment
 * @param {Recruitment} request.body.required - The recruitment object to insert - multipart/form-data
 * @returns {object} 200 - Success message
 * @returns {object} 400 - Bad request
 */

const router = express.Router();
router.use('/private', authorizeAccess(1), express.static('private'));
router.post('/', controllerHandler(recruitController.insertOne));

module.exports = router;
