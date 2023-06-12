/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
const debug = require('debug')('app:server');
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    /**
     *
     * Determines the value of the 'secure' property based on the 'PROD' environment variable.
     * The 'secure' property controls whether secure communication (e.g., HTTPS) is enabled or disabled.
     * It is used to toggle certain settings or behaviors based on the environment.
     *
     * - If 'process.env.PROD' is truthy (e.g., has a non-empty string value), 'secure' will be set to 'true'.
     * - If 'process.env.PROD' is falsy (e.g., undefined, null, empty string), 'secure' will be set to 'false'.
     *
     * Note: This code assumes the availability of the 'process.env.PROD' environment variable.
     *
     * Example usage:
     *   - In a production environment, where 'PROD' is set to a truthy value:
     *     secure: true
     *
     *   - In a development or testing environment, where 'PROD' is falsy or not defined:
     *     secure: false
     */
    secure: !!process.env.PROD, // This will only work if you have https enabled!
    maxAge: 60000 * 15, // 1 min for debugging
  },
}));
debug(`Production mode ${!!process.env.PROD}`);
app.use(express.json());
app.use(router);

app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
