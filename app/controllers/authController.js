const debug = require('debug')('app:controllers:authController');
const bcrypt = require('bcrypt');
const dataMapper = require('../models/dataMapper');
const authHandler = require('../middlewares/authHandler');

/**
 * Controller functions related to authentication.
 * @module authController
 */

const authController = {
  /**
   * Handles user login.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A promise that resolves once the login process is complete.
   */
  async handleLogin(request, response) {
    debug('login');
    const { email, password } = request.body;
    const jsonRes = {
      status: '',
    };
    const result = await dataMapper.getByEmail(email);
    if (!result[0]) {
      debug('database: email not matching');
      jsonRes.status = 'error';
      jsonRes.message = 'wrong credentials';
      return response.status(403).json(jsonRes);
    }

    debug('Comparing request.bodypassword with hashed db password...');
    const dbPassword = result[0].password;
    if (await bcrypt.compare(password, dbPassword)) {
      debug('✅ successfull login');
      return authController.sendAuthTokens(response, request.ip, result[0]);
    }
    jsonRes.message = 'wrong credentials';
    return response.status(403).json(jsonRes);
  },

  /**
   * Refreshes the access token using a refresh token.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A promise that resolves once the token refresh process is complete.
   */
  async handleTokenRefresh(request, response, next) {
    const { refreshToken } = request.body;
    debug(`handleTokenRefresh => refreshtoken: ${refreshToken}`);
    const authHeader = request.headers.authorization;
    debug(`handleTokenRefresh => authHeader: ${authHeader}`);
    if (!authHeader || !refreshToken) {
      return next(new Error('Missing authHeader or refreshToken'));
    }
    debug(`isRefreshTokenValid valid ? : ${await authHandler.isRefreshTokenValid(refreshToken)}`);
    const token = authHeader.split('Bearer ')[1];
    if (await authHandler.isRefreshTokenValid(refreshToken)) {
      const user = await authHandler.getUserFromToken(token);
      return authController.sendAuthTokens(response, request.ip, user[0]);
    }
    return next(new Error('isRefreshTokenValid is not valid'));
  },

  /**
   * Sends access and refresh tokens to the client.
   *
   * @param {Object} response - The response object.
   * @param {string} ip - The IP address of the user.
   * @param {Object} user - The user object containing user information.
   * @returns {Promise<void>} A promise that resolves once the tokens are sent.
   */
  async sendAuthTokens(response, ip, user) {
    const accessToken = authHandler.generateAccessTokenWithUser(ip, user);
    const refreshToken = authHandler.generateRefreshTokenForUser(user.id);
    debug('sendAuthTokens');
    await dataMapper.setRefreshToken(user.id, refreshToken);
    return response.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        email: user.email,
        permission_name: user.permission_name,
        permission_level: user.permission_level,
        accessToken,
        refreshToken,
      },
    });
  },
};

module.exports = authController;
