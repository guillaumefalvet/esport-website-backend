const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const auth = require('../../middlewares/auth');
const { createTeam, modifyTeam } = require('../../validations/schemas');
const validate = require('../../validations');
const { teamController } = require('../../controllers');

const router = express.Router();
router.get('/', controllerHandler(teamController.getAll));
router.get('/:user_name', controllerHandler(teamController.getOne));
router.post('/', auth, validate(createTeam), controllerHandler(teamController.createOne));
router.patch('/', auth, validate(modifyTeam), controllerHandler(teamController.modifyOne));
router.delete('/', auth, controllerHandler(teamController.delete));
module.exports = router;
