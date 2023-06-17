const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const recruitController = require('../../controllers/recruitmentController');
const { authorizeAccess } = require('../../middlewares/authHandler');

const router = express.Router();
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
 * @summary submit an application
 * @tags Recruitment
 * @param {Recruitment} request.body.required - The recruitment object to insert - multipart/form-data
 * @returns {object} 200 - Success message
 * @returns {object} 400 - Bad request
 */
router.post('/', controllerHandler(recruitController.insertOne));

/**
 * GET /api/recruitment
 * @summary Get all recruitment applications
 * @tags Recruitment
 * @security BearerAuth
 * @returns {object} 200 - Array of recruitment applications
 * @returns {object} 403 - Forbidden
 */
router.get('/', authorizeAccess(1), controllerHandler(recruitController.getAll));

// Serve static files in the 'private' directory

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
router.delete('/:id', authorizeAccess(1), controllerHandler(recruitController.deleteOne));
router.use('/private', authorizeAccess(1), express.static('private'));
module.exports = router;
