const debug = require('debug')('app:middlewares:authHandler');
const jwt = require('jsonwebtoken');
const dataMapper = require('../models/dataMapper');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

module.exports = {

  generateAccessTokenWithUser(user) {
    debug(`generateAccessTokenWithUser: ${user}`);
    return jwt.sign(
      {
        data: {
          id: user.id,
          user_name: user.user_name,
          permission_level: user.permission_level,
        },
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    );
  },

  generateRefreshTokenForUser(id) {
    debug(`generateRefreshTokenForUser for id :${id}`);
    debug(jwt.sign({ id }, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }));
    return jwt.sign({ id }, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
  },

  authorizeAccess(permissionLevelRequired) {
    return async (request, _, next) => {
      debug(`authorize middleware for level: ${permissionLevelRequired}`);
      try {
        const authHeader = request.headers.authorization;
        debug(`authHeader: ${authHeader}`);
        if (!authHeader) {
          debug('❌ no header found');
          const error = new Error();
          error.code = 401;
          return next(error);
        }
        const token = authHeader.split('Bearer ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        debug(`level required :${permissionLevelRequired}\ndecoded lvl: ${decoded.data.permission_level}`);
        if (decoded.data.permission_level !== permissionLevelRequired) {
          const error = new Error();
          error.code = 403;
          return next(error);
        }
        debug('✅ authorize done');
        return next();
      } catch (error) {
        debug(`❌no valid token to grant access to permission level: ${permissionLevelRequired}`);
        error.name = 'jwt expired';
        return next(error);
      }
    };
  },

  async isRefreshTokenValid(token) {
    const decodedToken = jwt.verify(token, JWT_REFRESH_SECRET);
    const storedToken = await dataMapper.getRefreshToken(decodedToken.id);
    debug(`isRefreshTokenValid:\n header token:   ${token} \n database token: ${storedToken}`);
    return token === storedToken;
  },

  async getUserFromToken(token) {
    const decoded = jwt.verify(
      token,
      JWT_SECRET,
      { ignoreExpiration: true },
    );
    debug(`getUserFromToken: ${decoded.data.id}`);
    return dataMapper.getByPk('user', decoded.data.id);
  },
};
