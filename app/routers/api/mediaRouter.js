/* eslint-disable max-len */
const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorizeAccess } = require('../../middlewares/authHandler');
const mediaController = require('../../controllers/mediaController');

const router = express.Router();
/**
 * @typedef {object} Media - a media type
 * @property {string} link - The media link
 * @property {string} img - the media file - binary
 */
/**
 * GET /api/media
 * @summary Get all media
 * @tags Media
 * @param {object} request.query - The request query parameters
 * @param {string} [request.query.media] - Optional query parameter to filter media by type. Possible values: 'photo' or 'video'.
 * @returns {Array<Media>} 200 - An array of media objects matching the specified filter
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(mediaController.getAllMedia.bind(mediaController)));
/**
 * POST /api/media
 * @summary Create a new media
 * @tags Media
 * @security BearerAuth
 * @param {Media} request.body.required - The media object to be created - multipart/form-data
 * @returns {object} 200 - Success message
 * @returns {object} 400 - Bad request
 */
router.post('/', authorizeAccess(1), controllerHandler(mediaController.insertMedia.bind(mediaController)));
/**
 * DELETE /api/media/:id

 * @summary Delete a media by ID
 * @tags Media
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the media to be deleted
 * @returns {object} 200 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - Not Found error
 */
router.delete('/:id(\\d+)', authorizeAccess(1), controllerHandler(mediaController.deleteMedia.bind(mediaController)));
module.exports = router;
