const debug = require('debug')('app:middlewares:auth');

module.exports = (request, response, next) => {
  debug('auth middleware');
  // if the permission lvl isn't strinctly equal to 1
  if (!request.session.profile || !request.session.profile.permission_level === 1) {
    debug('no user session found or not the right permission level');
    return response.status(403).json({
      status: 'error',
      message: 'Forbidden access',
    });
  }
  return next();
};
