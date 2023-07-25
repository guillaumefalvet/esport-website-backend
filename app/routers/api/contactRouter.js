const express = require('express');
const validate = require('../../validations/validate');
const { createContact } = require('../../validations/schemas/contact-schema');
const rateLimitHander = require('../../middlewares/rateLimitHandler');
const controllerHandler = require('../../middlewares/controllerHandler');
const contactController = require('../../controllers/contactController');

const router = express.Router();
router.post('/', validate(createContact), controllerHandler(contactController.createOne));

module.exports = router;
