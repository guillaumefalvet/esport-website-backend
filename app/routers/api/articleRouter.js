const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const auth = require('../../middlewares/auth');
const { createArticle, modifyArticle } = require('../../validations/schemas');
const validate = require('../../validations');
const { articleController } = require('../../controllers');

const router = express.Router();
router.get('/', controllerHandler(articleController.getAll));
router.get('/:slug', controllerHandler(articleController.getOne));
router.post('/', auth, validate(createArticle), controllerHandler(articleController.modifyOne));
router.patch('/:slug', auth, validate(modifyArticle), controllerHandler(articleController.modifyOne));
router.delete('/:slug', auth, controllerHandler(articleController.deleteOne));
module.exports = router;
