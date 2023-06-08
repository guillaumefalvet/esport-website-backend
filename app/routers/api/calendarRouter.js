const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const auth = require('../../middlewares/auth');
const { createCalendar, modifyCalendar } = require('../../validations/schemas');
const validate = require('../../validations');
const { calendarController } = require('../../controllers');

const router = express.Router();
router.get('/', controllerHandler(calendarController.getAll));
router.get('/:id', controllerHandler(calendarController.getOne));
router.post('/', auth, validate(createCalendar), controllerHandler(calendarController.createOne));
router.patch('/:id', auth, validate(modifyCalendar), controllerHandler(calendarController.modifyOne));
router.post('/:id', auth, controllerHandler(calendarController.deleteOne));

module.exports = router;
