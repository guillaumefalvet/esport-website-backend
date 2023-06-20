const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const categoryController = require('../../controllers/categoryController');

const router = express.Router();

/**
 * @typedef {object} Category
 * @property {number} id - a category id
 * @property {string} label - a category label
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
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
module.exports = router;
