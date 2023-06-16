/* eslint-disable max-len */
const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorizeAccess } = require('../../middlewares/authHandler');
const mediaController = require('../../controllers/mediaController');
const validate = require('../../validations/validate');
const { createMedia, modifyMedia } = require('../../validations/schemas/media-schema');

const router = express.Router();
/**
 * @typedef {object} Media
 * @property {number} id - Media ID
 * @property {string} link - The media link
 * @property {boolean} is_active - A boolean to differentiate a video from a photo
 * @property {string} created_at - Date of creation
 * @property {string} updated_at - Date of last update
 */
/**
 * GET /api/media
 *
 * Get all media
 * @summary Get all media
 * @tags Media
 * @param {object} request.query - The request query parameters
 * @param {string} [request.query.media] - Optional query parameter to filter media by type. Possible values: 'photo' or 'video'.
 * @returns {Array<Media>} 200 - An array of media objects matching the specified filter
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(mediaController.getAll));
/**
 * POST /api/media
*
 * Create a new media
 * @summary Create a new media
 * @tags Media
 * @security BearerAuth
 * @param {object} request.body - The request body
 * @param {Media} request.body - The media object to be created
 * @returns {Media} 200 - The newly created media object
 * @returns {object} 500 - Internal server error
 */
router.post('/', validate(createMedia), authorizeAccess(1), controllerHandler(mediaController.insertOne));
/**
 * PATCH /api/media/{id}
*
 * Update a media by ID
 * @summary Update a media by ID
 * @tags Media
 * @security BearerAuth
 * @param {number} request.params.id - The ID of the media to be updated
 * @param {object} request.body - The request body
 * @param {Partial<Media>} request.body - The updated media object
 * @returns {Media} 200 - The updated media object
 * @returns {object} 500 - Internal server error
 */
router.patch('/:id', validate(modifyMedia), authorizeAccess(1), controllerHandler(mediaController.updateOne));
/**
 * DELETE /api/media/{id}
*
 * Delete a media by ID
 * @summary Delete a media by ID
 * @tags Media
 * @security BearerAuth
 * @param {number} request.params.id - The ID of the media to be deleted
 * @returns {object} 204 - No content
 * @returns {object} 500 - Internal server error
 */
router.delete('/:id', authorizeAccess(1), controllerHandler(mediaController.deleteOne));
module.exports = router;
