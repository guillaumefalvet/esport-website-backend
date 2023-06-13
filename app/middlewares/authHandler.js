const debug = require('debug')('app:middlewares:authHandler');
const jwt = require('jsonwebtoken');
const dataMapper = require('../models/dataMapper');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';
/**
 * Middleware functions related to authentication and authorization.
 * @module authHandler
 */

module.exports = {
  /**
   * Generates an access token.
   *
   * @param {string} ip - The IP address of the user.
   * @param {Object} user - The user object containing user information.
   * @returns {string} The generated access token.
   */
  generateAccessTokenWithUser(ip, user) {
    debug(`generateAccessTokenWithUser, ip:${ip},user: ${user}`);
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
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    );
  },

  /**
   * Generates a refresh token.
   *
   * @param {string} id - The user ID.
   * @returns {string} The generated refresh token.
   */
  generateRefreshTokenForUser(id) {
    debug(`generateRefreshTokenForUser for id :${id}`);
    debug(jwt.sign({ id }, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }));
    return jwt.sign({ id }, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
  },

  /**
   * Middleware function to authorize access based on permission level.
   *
   * @param {number} permissionLevelRequired - The required permission level.
   * @returns {Function} The authorization middleware function.
   */
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
        if (decoded.data.ip !== request.ip) {
          const error = new Error();
          error.code = 401;
          return next(error);
        }
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

  /**
   * Checks if a refresh token is valid.
   *
   * @param {string} token - The refresh token to validate.
   * @returns {Promise<boolean>} A promise resolving to `true` if the token is valid, or `false` otherwise.
   */
  async isRefreshTokenValid(token) {
    const decodedToken = jwt.verify(token, JWT_REFRESH_SECRET);
    const storedToken = await dataMapper.getRefreshToken(decodedToken.id);
    debug(`isRefreshTokenValid:\n header token:   ${token} \n database token: ${storedToken}`);
    return token === storedToken;
  },

  /**
   * Retrieves the user associated with a token.
   *
   * @param {string} token - The token containing user information.
   * @returns {Promise<Object>} A promise resolving to the user object.
   */
  async getUserFromToken(token) {
    const decoded = jwt.verify(
      token,
      JWT_SECRET,
      { ignoreExpiration: true },
    );
    debug(`getUserFromToken: ${decoded.data.email}`);
    return dataMapper.getByEmail(decoded.data.email);
  },
};
