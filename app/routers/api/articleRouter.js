const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorizeAccess } = require('../../middlewares/authHandler');
const { createArticle, modifyArticle } = require('../../validations/schemas/article-schema');
const validate = require('../../validations/validate');
const articleController = require('../../controllers/articleController');

const router = express.Router();
/**
 * @typedef {object} Article
 * @property {number} id - The article ID
 * @property {string} slug - The article slug
 * @property {string} title - The article title
 * @property {string} content - The article content
 * @property {string} author - The article author
 * @property {string} small_image - The URL of the article's small image
 * @property {string} medium_image - The URL of the article's medium image
 * @property {string} large_image - The URL of the article's large image
 * @property {string} figcaption - The article figcaption
 * @property {string} publication_date - The article publication date
 * @property {string} created_at - The date of creation
 * @property {string} updated_at - The date of last update
 */

/**
 * Get all articles
 * @route GET /api/articles/
 * @tags Article
 * @returns {Array.<Article>} 200 - Array of article objects
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(articleController.getAll));

/**
 * Get all private articles (admin only)
 * @route GET /api/articles/admin
 * @tags Article
 * @security BearerAuth
 * @returns {Array.<Article>} 200 - Array of private article objects
 * @returns {object} 500 - Internal server error
 */
router.get('/admin', authorizeAccess(1), controllerHandler(articleController.getAllPrivate));

/**
 * Get a specific article by slug
 * @route GET /api/articles/{slug}
 * @tags Article
 * @param {string} slug.path - The slug of the article to retrieve
 * @returns {Article} 200 - The article object
 * @returns {object} 500 - Internal server error
 */
router.get('/:slug', controllerHandler(articleController.getOne));

/**
 * Create a new article
 * @route POST /api/articles
 * @tags Article
 * @security BearerAuth
 * @param {Article} request.body - The article object to create
 * @returns {Article} 200 - The created article object
 * @returns {object} 500 - Internal server error
 */
router.post('/', authorizeAccess(1), validate(createArticle), controllerHandler(articleController.insertOne));

/**
 * Add a category to an article
 * @route POST /api/articles/{slug}/category/{id}
 * @tags Article
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the category to add
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.post('/:slug/category/:id', authorizeAccess(1), controllerHandler(articleController.insertCategory));

/**
 * Add a calendar event to an article
 * @route POST /api/articles/{slug}/calendar/{id}
 * @tags Article
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the calendar event to add
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.post('/:slug/calendar/:id', authorizeAccess(1), controllerHandler(articleController.insertCalendar));

/**
 * Update an existing article by slug
 * @route PATCH /api/articles/{slug}
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to update
 * @param {Article} request.body - The updated article object
 * @returns {Article} 200 - The updated article object
 * @returns {object} 500 - Internal server error
 */
router.patch('/:slug', authorizeAccess(1), validate(modifyArticle), controllerHandler(articleController.updateOne));

/**
 * Delete an article by slug
 * @route DELETE /api/articles/{slug}
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to delete
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug', authorizeAccess(1), controllerHandler(articleController.deleteOne));

/**
 * Remove a category from an article
 * @route DELETE /api/articles/{slug}/category/{id}
 * @tags Article
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the category to remove
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug/category/:id', authorizeAccess(1), controllerHandler(articleController.deleteCategory));

/**
 * Remove a calendar event from an article
 * @route DELETE /api/articles/{slug}/calendar/{id}
 * @tags Article
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the calendar event to remove
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug/calendar/:id', authorizeAccess(1), controllerHandler(articleController.deleteCalendar));

module.exports = router;
