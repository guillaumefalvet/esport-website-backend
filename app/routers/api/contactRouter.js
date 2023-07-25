const express = require('express');
const validate = require('../../validations/validate');
const { createContact } = require('../../validations/schemas/contact-schema');
const rateLimitHander = require('../../middlewares/rateLimitHandler');
const controllerHandler = require('../../middlewares/controllerHandler');
const contactController = require('../../controllers/contactController');

const router = express.Router();
/**
 * @typedef {object} Contact - Represents a contact object.
 * @property {string} email - The email address of the contact. (Required)
 * @property {string} first_name - The first name of the contact. (Required)
 * @property {string} last_name - The last name of the contact. (Required)
 * @property {string} subject - The subject of the contact. (Required)
 * @property {string} message - The message of the contact. (Required)
 * @property {boolean} copy - Indicates whether a copy of the contact should be sent to the user. (Required)
 */

/**
 * POST /api/contact
 * @summary Create a new contact
 * @tags Contact
 * @param {Contact} request.body.required - The contact object to be created
 * @returns {object} 201 - Success message
 * @returns {object} 500 - Internal server error
 */
router.post('/', rateLimitHander, validate(createContact), controllerHandler(contactController.createOne));

module.exports = router;
