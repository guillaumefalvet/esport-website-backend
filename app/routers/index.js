const express = require('express');
const apiRouter = require('./api');
const { authorizeAccess } = require('../middlewares/authHandler');

const router = express.Router();

/**
 * every request starting with /api/.. will be handled here
 */
router.use('/api', apiRouter);
router.use('/public', express.static('public'));
router.use('/private', authorizeAccess(1), express.static('private'));

/**
 * error handlers for 404 here
 */
module.exports = router;
