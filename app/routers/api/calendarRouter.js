const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { authorizeAccess } = require('../../middlewares/authHandler');
// const { createCalendar, modifyCalendar } = require('../../validations/schemas');
// const validate = require('../../validations');
const calendarController = require('../../controllers/calendarController');

const router = express.Router();
/**
 * @typedef {object} Calendar
 * @property {number} id - a calendar id
 * @property {string} event_name - a calendar event name
 * @property {string} event_date - a calendar event date
 * @property {string} adversary_name - a calendar adversary name
 * @property {string} adversary_name_short - a calendar adversary name shorter
 * @property {string} replay_link - a calendar replay_link
 * @property {string} live_link - a calendar live_link
 * @property {string} score - a calendar score
 * @property {string} image - a calendar image
 * @property {string} publication_date - a calendar publication date
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */
/**
 * GET /api/calendar
 *
 * @summary get all calendar
 * @tags Calendar
 *
 * @returns {Array<Calendar>} 200 - success response
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(calendarController.getAllCalendar.bind(calendarController)));
/**
 * GET /api/calendar/:id
 *
 * @summary Get a specific calendar event by ID
 * @tags Calendar
 * @param {number} id.path - The ID of the calendar event to retrieve
 * @returns {Array<Calendar>} 200 - The calendar event object
 * @returns {object} 500 - Internal server error
 */
router.get('/:id(\\d+)', controllerHandler(calendarController.getOne.bind(calendarController)));

/**
 * POST /api/calendar
 *
 * @summary Create a new calendar event
 * @tags Calendar
 * @security BearerAuth
 * @param {Calendar} request.body - The calendar event object to create
 * @returns {Array<Calendar>} 201 - The created calendar event object
 * @returns {object} 403 - Forbidden
 * @returns {object} 303 - already exist
 */
router.post('/', authorizeAccess(1), controllerHandler(calendarController.uploadOne.bind(calendarController)));

/**
 * PATCH /api/calendar/:id
 *
 * @summary Update an existing calendar event by ID
 * @tags Calendar
 * @security BearerAuth
 * @param {number} id.path - The ID of the calendar event to update
 * @param {Calendar} request.body - The updated calendar event object
 * @returns {Array<Calendar>} 200 - The updated calendar event object
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - not found
 */
router.patch('/:id(\\d+)', authorizeAccess(1), controllerHandler(calendarController.modifyUploadedOne.bind(calendarController)));

/**
 * DELETE /api/calendar/:id
 *
 * @summary Delete a calendar event by ID
 * @tags Calendar
 * @security BearerAuth
 * @param {number} id.path - The ID of the calendar event to delete
 * @returns {object} 204 - Success message
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - not found
 */
router.delete('/:id(\\d+)', authorizeAccess(1), controllerHandler(calendarController.deleteUploadedOne.bind(calendarController)));

module.exports = router;
