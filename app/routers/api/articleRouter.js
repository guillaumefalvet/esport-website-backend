const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorize } = require('../../middlewares/authHandler');
const { createArticle, modifyArticle } = require('../../validations/schemas/article-schema');
const validate = require('../../validations/validate');
const articleController = require('../../controllers/articleController');

const router = express.Router();
/**
 * @typedef {object} Article
 * @property {number} id - an article id
 * @property {string} slug - an article slug
 * @property {string} title - an article title
 * @property {string} content - an article content
 * @property {string} author - an article author
 * @property {string} small_image - an article small image
 * @property {string} medium_image - an article medium image
 * @property {string} large_image - an article large_image
 * @property {string} figcaption - an article figcaption
 * @property {string} publication_date - an article publication date
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * GET /api/article/
 * @summary Get all articles
 * @tags Article
 * @returns {Article} 200 - The article object
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(articleController.getAll));
/**
 * GET /api/article/:slug
 * @summary Get a specific article by slug
 * @tags Article
 * @param {string} slug.path - The slug of the article to retrieve
 * @returns {Article} 200 - The article object
 * @returns {object} 500 - Internal server error
 */
router.get('/:slug', controllerHandler(articleController.getOne));

/**
 * POST /api/article
 * @summary Create a new article
 * @tags Article
 * @security BearerAuth
 * @param {Article} request.body - The article object to create
 * @returns {Article} 200 - The created article object
 * @returns {object} 500 - Internal server error
 */
router.post('/', authorize(1), validate(createArticle), controllerHandler(articleController.insertOne));

/**
 * PATCH /api/article/:slug
 * @summary Update an existing article by slug
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to update
 * @param {Article} request.body - The updated article object
 * @returns {Article} 200 - The updated article object
 * @returns {object} 500 - Internal server error
 */
router.patch('/:slug', authorize(1), validate(modifyArticle), controllerHandler(articleController.updateOne));

/**
 * DELETE /api/article/:slug
 * @summary Delete an article by slug
 * @tags Article
 * @security BearerAuth
 * @param {string} slug.path - The slug of the article to delete
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:slug', authorize(1), controllerHandler(articleController.deleteOne));

module.exports = router;
