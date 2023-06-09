const debug = require('debug')('app:server');
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // This will only work if you have https enabled!
    maxAge: 60000, // 1 min for debugging
  },
}));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
