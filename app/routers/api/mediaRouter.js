/* eslint-disable max-len */
const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { mediaController } = require('../../controllers');

const router = express.Router();
/**
 * @typedef {object} Media
 * @property {number} id - media id
 * @property {string} link - the media link
 * @property {boolean} is_active - a boolean to differentiate a video from photo
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * GET /api/media
 * @summary Get all media
 * @tags Media
 * @param {string} [request.query.media] - Optional query param to filter media by type. Possible values: 'photo' or 'video'.
 * @returns {Array<Media>} 200 - Array of media objects matching the specified filter
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(mediaController.getAll));
module.exports = router;
