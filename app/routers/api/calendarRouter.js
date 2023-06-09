const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const auth = require('../../middlewares/auth');
const { createCalendar, modifyCalendar } = require('../../validations/schemas');
const validate = require('../../validations');
const { calendarController } = require('../../controllers');

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
 * @property {string} small_image - a calendar small image
 * @property {string} medium_image - a calendar medium image
 * @property {string} large_image - a calendar large image
 * @property {string} publication_date - a calendar publication date
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */
/**
 * GET /api/calendar
 *
 * @summary get all calendar
 * @tags Calendar get all route
 *
 * @returns {Array<Calendar>} 200 - success response
 * @returns {object} 500 - Internal server error
 */
router.get('/', controllerHandler(calendarController.getAll));
/**
 * GET /api/calendar/:id
 *
 * @summary Get a specific calendar event by ID
 * @tags Calendar
 * @param {number} id.path - The ID of the calendar event to retrieve
 * @returns {Array<Calendar>} 200 - The calendar event object
 * @returns {object} 500 - Internal server error
 */
router.get('/:id', controllerHandler(calendarController.getOne));

/**
 * POST /api/calendar
 *
 * @summary Create a new calendar event
 * @tags Calendar
 * @security BearerAuth
 * @param {Calendar} request.body - The calendar event object to create
 * @returns {Array<Calendar>} 200 - The created calendar event object
 * @returns {object} 500 - Internal server error
 */
router.post('/', auth, validate(createCalendar), controllerHandler(calendarController.createOne));

/**
 * PATCH /api/calendar/:id
 *
 * @summary Update an existing calendar event by ID
 * @tags Calendar
 * @security BearerAuth
 * @param {number} id.path - The ID of the calendar event to update
 * @param {Calendar} request.body - The updated calendar event object
 * @returns {Array<Calendar>} 200 - The updated calendar event object
 * @returns {object} 500 - Internal server error
 */
router.patch('/:id', auth, validate(modifyCalendar), controllerHandler(calendarController.updateOne));

/**
 * DELETE /api/calendar/:id
 *
 * @summary Delete a calendar event by ID
 * @tags Calendar
 * @security BearerAuth
 * @param {number} id.path - The ID of the calendar event to delete
 * @returns {object} 200 - Success message
 * @returns {object} 500 - Internal server error
 */
router.delete('/:id', auth, controllerHandler(calendarController.deleteOne));

module.exports = router;
