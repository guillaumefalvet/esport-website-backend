const expressSwagger = require('express-jsdoc-swagger');
require('dotenv').config();

const swaggerOptions = {
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

function swaggerService(app, baseDir) {
  swaggerOptions.baseDir = baseDir;
  expressSwagger(app)(swaggerOptions);
}

module.exports = swaggerService;
