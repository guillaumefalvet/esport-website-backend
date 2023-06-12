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
  async login(request, response, next) {
    debug('login');
    const { email, password } = request.body;
    const jsonRes = {
      status: '',
    };
    const result = await dataMapper.getByEmail(email);
    if (!result[0]) {
      debug('database: email not matching');
      jsonRes.status = 'error';
      jsonRes.message = 'wrong credentials email';
      return response.status(400).json(jsonRes);
    }

    debug('Comparing password with hashed password...');
    const dbPassword = result[0].password;
    if (await bcrypt.compare(password, dbPassword)) {
      return authController.sendTokens(response, request.ip, result[0]);
    }
    jsonRes.message = 'wrong credentials password';
    return response.status(400).json(jsonRes);
  },

  /**
   * Refreshes the access token using a refresh token.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A promise that resolves once the token refresh process is complete.
   */
  async tokenRefresh(request, response, next) {
    debug('token refreshed');
    const { refreshToken } = request.body;
    const authHeader = request.headers.authorization;
    if (!authHeader || !refreshToken) {
      return next(new Error('Unauthorized'));
    }
    if (await authHandler.isValidRefreshToken(refreshToken)) {
      const token = authHeader.split('Bearer ')[1];
      const user = await authHandler.getTokenUser(token);
      return authController.sendTokens(response, request.ip, user);
    }
    return next(new Error('Unauthorized'));
  },

  /**
   * Sends access and refresh tokens to the client.
   *
   * @param {Object} response - The response object.
   * @param {string} ip - The IP address of the user.
   * @param {Object} user - The user object containing user information.
   * @returns {Promise<void>} A promise that resolves once the tokens are sent.
   */
  async sendTokens(response, ip, user) {
    const accessToken = authHandler.generateAccessToken(ip, user);
    const refreshToken = authHandler.generateRefreshToken(user.id);
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
