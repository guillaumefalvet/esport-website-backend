const express = require('express');
const mediaRouter = require('./mediaRouter');
const articleRouter = require('./articleRouter');
const calendarRouter = require('./calendarRouter');
const teamRouter = require('./teamRouter');
const recruitmentRouter = require('./recruitmentRouter');
const categoryRouter = require('./categoryRouter');
const authRouter = require('./authRouter');
const { error404, errorHandler } = require('../../middlewares/errorHandler');

const router = express.Router();

router.use('/media', mediaRouter);
router.use('/articles', articleRouter);
router.use('/calendar', calendarRouter);
router.use('/team', teamRouter);
router.use('/recruitment', recruitmentRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
/**
 * error handlers for 404 here
 */
router.use(error404);
router.use(errorHandler);
module.exports = router;
