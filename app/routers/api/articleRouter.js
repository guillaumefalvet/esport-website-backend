/* eslint-disable camelcase */
const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorizeAccess } = require('../../middlewares/authHandler');
const articleController = require('../../controllers/articleController');

const router = express.Router();
/**
 * @typedef {object} Article
 * @property {string} title.required - The article title
 * @property {string} content.required - The article content
 * @property {string} image.required - The file of the article's image. - binary
 * @property {string} figcaption - The article figcaption
 * @property {string} publication_date.required - The article publication date
 */

/**
 * GET /api/articles/
 *
 * @summary Get all articles
 * @tags Article
 * @returns {Array<Article>} 200 - Array of article objects
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(articleController.getAllPublic.bind(articleController)));

/**
 * GET /api/articles/admin
 *
 * @summary Get all private articles
 * @tags Article
* @security BearerAuth
 * @returns {Array<Article>} 200 - Array of private article objects
 * @returns {object} 403 - Forbidden
 * @returns {object} 500 - Internal server error
 */
router.get('/admin', authorizeAccess(1), controllerHandler(articleController.getAllPrivate.bind(articleController)));

/**
 * GET /api/articles/:slug
 *
 * @summary Get a specific article by slug
 * @tags Article
 * @param {string} slug.path - The slug of the article to retrieve
 * @returns {Array<Article>} 200 - The article object
 * @returns {object} 500 - Internal server error
 */
router.get('/:slug([a-z0-9-]+)', controllerHandler(articleController.getOne.bind(articleController)));

/**
 * GET /api/articles/admin/:slug
 *
 * @summary Get a specific article by slug
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to retrieve
 * @returns {Array<Article>} 200 - The article object
 * @returns {object} 500 - Internal server error
 */
router.get('/admin/:slug([a-z0-9-]+)', controllerHandler(articleController.getOnePrivate.bind(articleController)));

/**
 * POST /api/articles
 *
 * @summary Create a new article
 * @tags Article
 * @security BearerAuth
 * @param {Article} request.body  - The article object to create - multipart/form-data
 * @returns {Array<Article>} 201 - The created article object
 * @returns {object} 403 - Forbidden
 * @returns {object} 500 - Internal server error
 */
router.post('/', authorizeAccess(1), controllerHandler(articleController.uploadOne.bind(articleController)));

/**
 * POST /api/articles/:slug/category/:id
 *
 * @summary Add a category to an article
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the category to add
 * @returns {object} 201 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 500 - Internal server error
 */
router.post('/:slug([a-z0-9-]+)/category/:id(\\d+)', authorizeAccess(1), controllerHandler(articleController.createCategoryRelation.bind(articleController)));

/**
 * PATCH /api/articles/:id
 *
 * @summary Update an existing article by slug
 * @tags Article
 * @security BearerAuth
 * @param {number} id.path - The id of the article to update
 * @param {Article} request.body - The article object to create - multipart/form-data
 * @returns {Array<Article>} 200 - The updated article object
 * @returns {object} 403 - Forbidden
 * @returns {object} 500 - Internal server error
 */
router.patch('/:id(\\d+)', authorizeAccess(1), controllerHandler(articleController.modifyUploadedOne.bind(articleController)));

/**
 * DELETE /api/articles/:slug
 *
 * @summary Delete an article by slug
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to delete
 * @returns {object} 204 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug([a-z0-9-]+)', authorizeAccess(1), controllerHandler(articleController.deleteUploadedOne.bind(articleController)));

/**
 * DELETE /api/articles/:slug/category/:id
 *
 * @summary Remove a category from an article
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article
 * @param {number} id.path - The ID of the category to remove
 * @returns {object} 204 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug([a-z0-9-]+)/category/:id(\\d+)', authorizeAccess(1), controllerHandler(articleController.deleteCategoryRelation.bind(articleController)));

module.exports = router;
