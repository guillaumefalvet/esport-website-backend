const debug = require('debug')('app:server');
require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const cors = require('cors');
const router = require('./app/routers');
const { corsOptions } = require('./app/services/corsService');
const swaggerService = require('./app/services/swaggerService');
const backupService = require('./app/services/backupService');

const app = express();
const port = process.env.PORT || 3000;
/**
 * Executes a scheduled backup task using cron.
 *
 * @param {string} cronExpression - The cron expression specifying the schedule of the task.
 * for more info about the syntax https://www.gnu.org/software/mcron/manual/html_node/Crontab-file.html
 * @param {Function} task - The task to be executed on the scheduled interval.
 * @param {Object} options - Additional options for the cron scheduler.
 * @param {string} options.timezone - The timezone in which the task should run.
 */
// EVERY SUNDAY AT 9:30 (Paris time), it will fun the function
cron.schedule('30 9 * * SUN', () => {
  debug('sunday backup');
  backupService.dump();
}, {
  timezone: 'Europe/Paris',
});
swaggerService(app, `${__dirname}/app/routers`);
app.use(express.urlencoded({ extended: true }));
debug(`Production mode ${!!process.env.PROD}`);
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.listen(port, () => {
  debug(`🚀 Server ready: http://localhost:${port}`);
  debug(`📚 SwaggerUI: http://localhost:${port}/api-docs`);
  debug(`🏞️  Public image: http://localhost:${port}/public`);
});
