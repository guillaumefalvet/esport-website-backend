const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { mediaController } = require('../../controllers');

const router = express.Router();

router.get('/', controllerHandler(mediaController.getAll));
module.exports = router;
