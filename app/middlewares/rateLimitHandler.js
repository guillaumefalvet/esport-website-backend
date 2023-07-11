const rateLimit = require('express-rate-limit');
// 1000ms = 1s
const timeInSec = 1000 * 60; // 60 sec
const minuteTimeOut = 15; // <- minutes wanted
const timeInMinute = timeInSec * minuteTimeOut; // 60sec * the minite wanted

const rateLimitHander = rateLimit({
  windowMs: timeInMinute, // 15 min in milliseconds
  max: 5,
  message: {
    status: 'error',
    message: `You have reached maximum retries. Please try again after ${minuteTimeOut} minutes`,
  },
  statusCode: 429,
  headers: true,
});

module.exports = rateLimitHander;
