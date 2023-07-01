const express = require('express');
const serveIndex = require('serve-index');
const apiRouter = require('./api');
const { authorizeAccess } = require('../middlewares/authHandler');
const { error404, errorHandler } = require('../middlewares/errorHandler');

const router = express.Router();

router.use('/api', apiRouter);
router.use('/public', express.static('public'));
router.use('/public', serveIndex('public', { icons: true }));
router.use('/private', authorizeAccess(1), express.static('private'));

router.use(error404);
router.use(errorHandler);

module.exports = router;
