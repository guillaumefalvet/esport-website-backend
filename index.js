const debug = require('debug')('app:server');
require('dotenv').config();
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const cors = require('cors');
const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();
const options = {
  info: {
    version: '1.0.0',
    title: 'victoryzone',
  },
  security: {
    BasicAuth: {
      type: process.env.PROD ? 'https' : 'http',
      scheme: 'basic',
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: `${__dirname}/app`,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
};
const corsOptions = {
  origine: '*', // Autoriser toutes les origines (vous pouvez spécifier des origines spécifiques si nécessaire)
  methode: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser les méthodes HTTP spécifiées
  allowedHeader: ['Content-Type', 'Authorization'], // Autoriser les en-têtes spécifiés

};
app.use(express.urlencoded({ extended: true }));

debug(`Production mode ${!!process.env.PROD}`);
expressJSDocSwagger(app)(options);
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
