/* eslint-disable camelcase */
const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorizeAccess } = require('../../middlewares/authHandler');
const { createArticle, modifyArticle } = require('../../validations/schemas/article-schema');
const validate = require('../../validations/validate');
const articleController = require('../../controllers/articleController');
const Article_Controller = require('../../controllers/Article_Controller');

const router = express.Router();
/**
 * @typedef {object} Article
 * @property {number} id - The article ID
 * @property {string} slug - The article slug
 * @property {string} title - The article title
 * @property {string} content - The article content
 * @property {string} author - The article author
 * @property {string} image - The URL of the article's image
 * @property {string} figcaption - The article figcaption
 * @property {string} publication_date - The article publication date
 * @property {string} created_at - The date of creation
 * @property {string} updated_at - The date of last update
 */

/**
 * GET /api/articles/
 *
 * @summary Get all articles
 * @tags Article
 * @returns {Array.<Article>} 200 - Array of article objects
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(Article_Controller.getAll.bind(Article_Controller)));

/**
 * GET /api/articles/admin
 *
 * @summary Get all private articles (admin only)
 * @tags Article
 * @security BearerAuth
 * @returns {Array.<Article>} 200 - Array of private article objects
 * @returns {object} 500 - Internal server error
 */
router.get('/admin', authorizeAccess(1), controllerHandler(articleController.getAllPrivate));

/**
 * GET /api/articles/{slug}
 *
 * @summary Get a specific article by slug
 * @tags Article
 * @param {string} slug.path - The slug of the article to retrieve
 * @returns {Article} 200 - The article object
 * @returns {object} 500 - Internal server error
 */
router.get('/:slug', controllerHandler(Article_Controller.getOne.bind(Article_Controller)));

/**
 * POST /api/articles
 *
 * @summary Create a new article
 * @tags Article
 * @security BearerAuth
 * @param {Article} request.body - The article object to create
 * @returns {Article} 200 - The created article object
 * @returns {object} 500 - Internal server error
 */
router.post('/', authorizeAccess(1), validate(createArticle), controllerHandler(Article_Controller.createOne.bind(Article_Controller)));

/**
 * POST /api/articles/{slug}/category/{id}
 *
 * @summary Add a category to an article
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the category to add
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.post('/:slug/category/:id', authorizeAccess(1), controllerHandler(articleController.insertCategory));

/**
 * POST /api/articles/{slug}/calendar/{id}
 *
 * @summary Add a calendar event to an article
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the calendar event to add
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.post('/:slug/calendar/:id', authorizeAccess(1), controllerHandler(articleController.insertCalendar));

/**
 * PATCH /api/articles/{slug}
 *
 * @summary Update an existing article by slug
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to update
 * @param {Article} request.body - The updated article object
 * @returns {Article} 200 - The updated article object
 * @returns {object} 500 - Internal server error
 */
router.patch('/:slug', authorizeAccess(1), validate(modifyArticle), controllerHandler(Article_Controller.modifyOne.bind(Article_Controller)));

/**
 * DELETE /api/articles/{slug}
 *
 * @summary Delete an article by slug
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to delete
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug', authorizeAccess(1), controllerHandler(articleController.deleteOne));

/**
 * DELETE /api/articles/{slug}/category/{id}
 *
 * @summary Remove a category from an article
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the category to remove
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug/category/:id', authorizeAccess(1), controllerHandler(articleController.deleteCategory));

/**
 * DELETE /api/articles/{slug}/calendar/{id}
 *
 * @summary Remove a calendar event from an article
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the calendar event to remove
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug/calendar/:id', authorizeAccess(1), controllerHandler(articleController.deleteCalendar));

module.exports = router;
