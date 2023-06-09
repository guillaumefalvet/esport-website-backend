const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { mediaController } = require('../../controllers');

const router = express.Router();
/**
 * @typedef {object} Media
 * @property {string} link - the media link
 * @property {boolean} is_active - a boolean to differentiate a video from photo
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * GET /api/media?type=photo
 * GET /api/media?type=video
 * @summary get all medias
 * @tags media
 * @param {string} request.query.media
 * @returns {Array<Media>} 200 - success
 * @returns {object} 500 - internal server error
 */
router.get('/', controllerHandler(mediaController.getAll));
module.exports = router;
