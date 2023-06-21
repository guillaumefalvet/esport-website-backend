const debug = require('debug')('app:middlewares:authHandler');
const jwt = require('jsonwebtoken');
const dataMapper = require('../models/dataMapper');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';
/**
 * Auth Handler provides functions for handling authentication operations.
 * @namespace authHandler
 */
const authHandler = {
  /**
   * Generates an access token for the given user.
   * @memberof authHandler
   * @function generateAccessTokenWithUser
   * @param {object} user - User object.
   * @returns {string} - Generated access token.
   */
  generateAccessTokenWithUser(user) {
    debug('generating access token ...');
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
  /**
   * Generates a refresh token for the given user ID.
   * @memberof authHandler
   * @function generateRefreshTokenForUser
   * @param {number} id - User ID.
   * @returns {string} - Generated refresh token.
   */
  generateRefreshTokenForUser(id) {
    debug('generating refresh token ...');
    return jwt.sign({ id }, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
  },
  /**
   * Middleware that authorizes access based on the required permission level.
   * @memberof authHandler
   * @function authorizeAccess
   * @param {number} permissionLevelRequired - Required permission level.
   * @returns {function} - Express middleware function.
   */
  authorizeAccess(permissionLevelRequired) {
    return async (request, _, next) => {
      debug(`authorize middleware for level: ${permissionLevelRequired}`);
      try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
          debug('❌ ERROR: no header found');
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
        debug(`❌ ERRO: no valid token to grant access to permission level: ${permissionLevelRequired}`);
        error.name = 'jwt expired';
        return next(error);
      }
    };
  },
  /**
   * Checks if the provided refresh token is valid.
   * @async
   * @memberof authHandler
   * @function isRefreshTokenValid
   * @param {string} token - Refresh token.
   * @returns {Promise<boolean>} - Indicates if the refresh token is valid.
   */
  async isRefreshTokenValid(token) {
    const decodedToken = jwt.verify(token, JWT_REFRESH_SECRET);
    const storedToken = await dataMapper.getRefreshToken(decodedToken.id);
    debug(token === storedToken ? '✅ valid refresh token' : '❌ not valid refresh token');
    return token === storedToken;
  },
  /**
   * Retrieves the user associated with the provided token.
   * @async
   * @memberof authHandler
   * @function getUserFromToken
   * @param {string} token - Access token.
   * @returns {Promise<object>} - User object.
   */
  async getUserFromToken(token) {
    debug('getUserFromToken');
    const decoded = jwt.verify(
      token,
      JWT_SECRET,
      { ignoreExpiration: true },
    );
    return dataMapper.getByColumnValue('get_user_view', 'id', decoded.data.id);
  },
  /**
 * Sends authentication tokens to the client.
 *
 * @async
 * @memberof authHandler
 * @function sendAuthTokens
 * @param {object} response - The response object.
 * @param {object} user - The user object.
 * @returns {Promise<object>} - Object containing the status and data of the tokens.
 */
  async sendAuthTokens(user) {
    debug('sending auth token ...');
    const accessToken = authHandler.generateAccessTokenWithUser(user);
    const refreshToken = authHandler.generateRefreshTokenForUser(user.id);
    debug('saving newly generated refresh token is the database ...');
    await dataMapper.setRefreshToken(user.id, refreshToken);
    return {
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    };
  },
};
module.exports = authHandler;
