const debug = require('debug')('app:server');
require('dotenv').config();

const express = require('express');
const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

debug(`Production mode ${!!process.env.PROD}`);
app.use(express.json());
app.use(router);

app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
