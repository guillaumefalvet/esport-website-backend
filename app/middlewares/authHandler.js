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
  generateRefreshToken(id) {
    debug(`generateRefreshToken for id :${id}`);
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
  authorize(permissionLevelRequired) {
    return async (request, _, next) => {
      debug(`authorize middleware for level: ${permissionLevelRequired}`);
      try {
        const authHeader = request.headers.authorization;
        debug(`authHeader: ${authHeader}`);
        if (!authHeader) {
          debug('❌ no header found');
          return next(new Error('no header found'));
        }
        const token = authHeader.split('Bearer ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.data.ip !== request.ip) {
          return next(new Error('401 different ip'));
        }
        if (decoded.data.permission_level !== permissionLevelRequired) {
          return next(new Error('401 insufficient permission'));
        }
        debug('✅ authorize done');
        return next();
      } catch (error) {
        debug(`❌no valid token to grant access to permission level: ${permissionLevelRequired}`);
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
  async isValidRefreshToken(token) {
    const decodedToken = jwt.verify(token, JWT_REFRESH_SECRET);
    debug('decoded');
    debug(decodedToken);
    const storedToken = await dataMapper.getRefreshToken(decodedToken.id);
    debug(`isValidRefreshToken:\n header token:   ${token} \n database token: ${storedToken}`);
    return token === storedToken;
  },

  /**
   * Retrieves the user associated with a token.
   *
   * @param {string} token - The token containing user information.
   * @returns {Promise<Object>} A promise resolving to the user object.
   */
  async getTokenUser(token) {
    const decoded = jwt.verify(
      token,
      JWT_SECRET,
      { ignoreExpiration: true },
    );
    debug(`getTokenUser ${decoded.data.email}`);
    return dataMapper.getByEmail(decoded.data.email);
  },
};
