const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorizeAccess } = require('../../middlewares/authHandler');
const { createPlayerValidation, modifyPlayerValidation } = require('../../validations/schemas/team-schema');
const validate = require('../../validations/validate');
const teamController = require('../../controllers/teamController');

const router = express.Router();
/**
 * a team type
 *
 * @typedef {object} Team
 * @property {number} id - a player id
 * @property {string} user_name - a player user name
 * @property {string} first_name - a player first name
 * @property {string} last_name - a player last name
 * @property {string} description - a player description
 * @property {string} role - a player role
 * @property {string} image - a player image
 * @property {string} statistics - a player statistic
 * @property {string} achievements - a player achievements
 * @property {string} youtube_link - a player youtube link
 * @property {string} twitch_link - a player twitch link
 * @property {string} twitter_link - a player twitter link
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
*/
/**
 * GET /api/team
 *
 * @summary Get all players
 * @tags Team
 *
 * @returns {Array<Team>} 200 - Success response
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(teamController.getAll.bind(teamController)));

/**
 * GET /api/team/:user_name
 *
 * @summary Get a specific player by user name
 * @tags Team
 * @param {string} user_name.path - The user name of the player to retrieve
 * @returns {Array<Team>} 200 - The player object
 * @returns {object} 500 - Internal server error
 */
router.get('/:user_name', controllerHandler(teamController.getOne.bind(teamController)));

/**
 * POST /api/team
 *
 * @summary Create a new player
 * @tags Team
 * @security BearerAuth
 * @param {Team} request.body - The player object to create
 * @returns {Array<Team>} 200 - The created player object
 * @returns {object} 500 - Internal server error
 */
router.post('/', authorizeAccess(1), validate(createPlayerValidation), controllerHandler(teamController.createOne.bind(teamController)));

/**
 * POST /api/team/:user_name/setup/:id
 *
 * @summary Create a link between a player and a setup
 * @tags Team
 * @security BearerAuth
 * @param {string} user_name.path - The user name of the player
 * @param {string} id.path - The ID of the setup
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.post('/:user_name/setup/:id', authorizeAccess(1), controllerHandler(teamController.createSetupRelation.bind(teamController)));

/**
 * POST /api/team/:user_name/media/:id
 *
 * @summary Create a link between a player and a media
 * @tags Team
 * @security BearerAuth
 * @param {string} user_name.path - The user name of the player
 * @param {string} id.path - The ID of the media
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.post('/:user_name/media/:id', authorizeAccess(1), controllerHandler(teamController.createMediaRelation.bind(teamController)));

/**
 * PATCH /api/team/:user_name
 *
 * @summary Update an existing player
 * @tags Team
 * @security BearerAuth
 * @param {string} user_name.path - The user name of the player to update
 * @param {Team} request.body - The updated player object
 * @returns {Array<Team>} 200 - The updated player object
 * @returns {object} 500 - Internal server error
 */
router.patch('/:user_name', authorizeAccess(1), validate(modifyPlayerValidation), controllerHandler(teamController.modifyOne.bind(teamController)));

/**
 * DELETE /api/team/:user_name
 *
 * @summary Delete a player
 * @tags Team
 * @security BearerAuth
 * @param {string} user_name.path - The user name of the player to delete
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:user_name', authorizeAccess(1), controllerHandler(teamController.deleteOne.bind(teamController)));

/**
 * DELETE /api/team/:user_name/setup/:id
 *
 * @summary Delete a link between a player and a setup
 * @tags Team
 * @security BearerAuth
 * @param {string} user_name.path - The user name of the player
 * @param {string} id.path - The ID of the setup to delete
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:user_name/setup/:id', authorizeAccess(1), controllerHandler(teamController.deleteSetupRelation.bind(teamController)));

/**
 * DELETE /api/team/:user_name/media/:id
 *
 * @summary Delete a link between a player and a media
 * @tags Team
 * @security BearerAuth
 * @param {string} user_name.path - The user name of the player
 * @param {string} id.path - The ID of the media to delete
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:user_name/media/:id', authorizeAccess(1), controllerHandler(teamController.deleteMediaRelation.bind(teamController)));

module.exports = router;
