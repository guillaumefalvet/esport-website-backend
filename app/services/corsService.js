const debug = require('debug')('app:services:cors');

module.exports = (req, res, next) => {
  let allowedDomains = [];
  if (process.env.PROD) {
    // Production mode
    allowedDomains = ['https://www.victoryzone.team', 'https://victoryzone-front-production.up.railway.app'];
  } else {
    debug('Development mode');
    allowedDomains = [req.headers.origin];
  }
  debug(req.headers.origin);
  if (allowedDomains.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
};
