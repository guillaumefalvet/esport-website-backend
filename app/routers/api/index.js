const express = require('express');
const mediaRouter = require('./mediaRouter');
const articleRouter = require('./articleRouter');
const teamRouter = require('./teamRouter');
// const calendarRouter = require('./calendarRouter');
const recruitmentRouter = require('./recruitmentRouter');
const { error404, errorHandler } = require('../../middlewares/errorHandler');
const authRouter = require('./authRouter');

const router = express.Router();

router.use('/media', mediaRouter);
router.use('/articles', articleRouter);
router.use('/team', teamRouter);
// router.use('/calendrier', calendarRouter);
router.use('/recruitment', recruitmentRouter);
router.use('/auth', authRouter);
/**
 * error handlers for 404 here
 */
router.use(error404);
router.use(errorHandler);
module.exports = router;
