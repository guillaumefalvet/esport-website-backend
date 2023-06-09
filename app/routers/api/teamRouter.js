const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const auth = require('../../middlewares/auth');
const { createTeam, modifyTeam } = require('../../validations/schemas');
const validate = require('../../validations');
const { teamController } = require('../../controllers');

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
 * @property {string} small_image - a player small image
 * @property {string} medium_image - a player medium image
 * @property {string} large_image - a player large image
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
 * @summary get all players
 * @tags Team - get all players from the team
 *
 * @returns {Array<Team>} 200 - success response
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(teamController.getAll));
/**
 * GET /api/team/:user_name
 *
 * @summary Get a specific player by user name
 * @tags Team
 * @param {string} user_name.path - The user name of the player to retrieve
 * @returns {Array<Team>} 200 - The player object
 * @returns {object} 500 - Internal server error
 */
router.get('/:user_name', controllerHandler(teamController.getOne));

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
router.post('/', auth, validate(createTeam), controllerHandler(teamController.createOne));

/**
 * PATCH /api/team
 *
 * @summary Update an existing player
 * @tags Team
 * @security BearerAuth
 * @param {Team} request.body - The updated player object
 * @returns {Array<Team>} 200 - The updated player object
 * @returns {object} 500 - Internal server error
 */
router.patch('/', auth, validate(modifyTeam), controllerHandler(teamController.updateOne));

/**
 * DELETE /api/team
 *
 * @summary Delete a player
 * @tags Team
 * @security BearerAuth
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/', auth, controllerHandler(teamController.deleteOne));

module.exports = router;
