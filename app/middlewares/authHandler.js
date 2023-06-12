const debug = require('debug')('app:middlewares:authHandler');
const jwt = require('jsonwebtoken');
const dataMapper = require('../models/dataMapper');

module.exports = {
  generateAccessToken(ip, user) {
    debug(`generateAccessToken, ip:${ip},user: ${user}`);
    return jwt.sign(
      {
        data: {
          ip,
          id: user.id,
          email: user.email,
          user_name: user.user_name,
          permission_name: user.permission_name,
          permission_level: user.permission_level,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    );
  },
  generateRefreshToken(id) {
    debug(`generateRefreshToken for id :${id}`);
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
  },
  authorize(permissionLevelRequired) {
    return async (request, _, next) => {
      debug(`authorize middleware for level: ${permissionLevelRequired}`);
      try {
        const authHeader = request.headers.authorization;
        debug(`authHeader: ${authHeader}`);
        if (!authHeader) {
          return next(new Error('no header found'));
        }
        const token = authHeader.split('Bearer ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.data.ip !== request.ip) {
          return next(new Error('different ip'));
        }
        if (decoded.data.permission_level !== permissionLevelRequired) {
          // insuffiant permission
          return next(new Error('insuffiant permission'));
        }
        debug('next step');
        return next();
      } catch (error) {
        debug(`no valid token to grant access to permission level: ${permissionLevelRequired}`);
        return next(error);
      }
    };
  },
  async isValidRefreshToken(token) {
    const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const storedToken = await dataMapper.getRefreshToken(decodedToken.id);
    return token === storedToken;
  },
  async getTokenUser(token) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { ignoreExpiration: true },
    );
    return dataMapper.getByEmail(decoded.data.email);
  },
};
