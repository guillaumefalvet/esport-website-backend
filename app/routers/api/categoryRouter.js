const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const categoryController = require('../../controllers/categoryController');
const { authorizeAccess } = require('../../middlewares/authHandler');
const { createCategory, modifyCategory } = require('../../validations/schemas/category-schema');
const validate = require('../../validations/validate');

const router = express.Router();

/**
 * @typedef {object} Category
 * @property {string} label - a category label

 */

/**
 * GET /api/category
 *
 * @summary Get all category
 * @tags Category
 * @returns {Array<Category>} 200 - success response
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(categoryController.getAll.bind(categoryController)));
/**
 * POST /api/category
 *
 * @summary Create a new category.
 * @tags Category
 * @security BearerAuth
 * @param {Category} request.body - The category event object to create
 * @returns {Array<Category>} 200 - The created category object.
 * @returns {object} 403 - Forbidden.
 */
router.post('/', authorizeAccess(1), validate(createCategory), controllerHandler(categoryController.createOne.bind(categoryController)));
/**
 * PATCH /api/category/:id
 *
 * @summary Update an existing calendar event by ID
 * @tags Calendar
 * @security BearerAuth
 * @param {number} id.path - The ID of the calendar event to update
 * @param {Category} request.body - The updated category event object
 * @returns {Array<Category>} 200 - The updated category event object
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - not found
 */
router.patch('/:id(\\d+)', authorizeAccess(1), validate(modifyCategory), controllerHandler(categoryController.modifyOne.bind(categoryController)));
/**
 * DELETE /api/category/:id
 *
 * @summary Delete a calendar event by ID
 * @tags Category
 * @security BearerAuth
 * @param {number} id.path - The ID of the category to delete
 * @returns {object} 204 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - not found
 */
router.delete('/:id(\\d+)', authorizeAccess(1), controllerHandler(categoryController.deleteOne.bind(categoryController)));
module.exports = router;
