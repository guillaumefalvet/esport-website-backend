const express = require('express');
const apiRouter = require('./api');

const router = express.Router();

/**
 * every request starting with /api/.. will be handled here
 */
router.use('/api', apiRouter);
/**
 * error handlers for 404 here
 */
module.exports = router;
