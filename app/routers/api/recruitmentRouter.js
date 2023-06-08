const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { createRecruitement } = require('../../validations/schemas');
const validate = require('../../validations');
const { recruitmentController } = require('../../controllers');

const router = express.Router();
router.post('/recruitment', validate(createRecruitement), controllerHandler(recruitmentController.createOne));

module.exports = router;
