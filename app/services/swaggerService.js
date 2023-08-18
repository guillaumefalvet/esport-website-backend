const expressSwagger = require('express-jsdoc-swagger');
const debug = require('debug')('app:test');
require('dotenv').config();

const swaggerOptions = {
  baseDir: `${__dirname}/../../app/routers`,
  info: {
    version: '1.0.0',
    title: 'victoryzone',
    description: 'VictoryZone API',
  },
  security: {
    BearerAuth: {
      type: process.env.PROD ? 'https' : 'http',
      scheme: 'bearer',
    },
  },
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};

module.exports = (app) => {
  expressSwagger(app)(swaggerOptions);
};
