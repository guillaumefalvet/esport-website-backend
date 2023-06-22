const debug = require('debug')('app:server');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/routers');
const { corsOptions } = require('./app/services/corsService');
const swaggerService = require('./app/services/swaggerService');

const port = process.env.PORT || 3000;
const app = express();
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
