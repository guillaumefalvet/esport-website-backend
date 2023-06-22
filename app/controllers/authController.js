const debug = require('debug')('app:controllers:authController');
const bcrypt = require('bcrypt');
const dataMapper = require('../models/dataMapper');
const authHandler = require('../middlewares/authHandler');
const CoreController = require('./CoreController');

const jsend = {
  status: 'success',
};
class AuthController extends CoreController {
  /**
   * Handles user login.
   * @async
   * @memberof authController
   * @function handleLogin
   * @param {object} request - Express request object.
   * @param {object} response - Express response object.
   * @param {function} next - Next middleware function.
   * @returns {Promise<void>}
   */
  async handleLogin(request, response, next) {
    debug(`${this.constructor.name} handleLogin`);
    const { email, password } = request.body;
    const result = await dataMapper.getByEmail(email);
    if (!result) {
      debug('❌ ERROR: user email ≠ any database email');
      const error = new Error();
      error.code = 401;
      return next(error);
    }

    debug('bcrypt is comparing the passswords...');
    const dbPassword = result.password;
    if (await bcrypt.compare(password, dbPassword)) {
      debug('✅ successfull login');
      const sendToken = await authHandler.sendAuthTokens(result);
      jsend.data = sendToken.data;
      return response.status(200).json(jsend);
    }
    debug('❌ ERROR: user password isn\'t matching database password for that user');
    const error = new Error();
    error.code = 401;
    return next(error);
  }

  /**
   * Handles token refresh.
   * @async
   * @memberof authController
   * @function handleTokenRefresh
   * @param {object} request - Express request object.
   * @param {object} response - Express response object.
   * @param {function} next - Next middleware function.
   * @returns {Promise<void>}
   */
  async handleTokenRefresh(request, response, next) {
    debug(`${this.constructor.name} handleTokenRefresh`);
    // refresh token is always stored in the body
    const { refreshToken } = request.body;
    // the a
    const authHeader = request.headers.authorization;
    // if there is no header
    if (!authHeader || !refreshToken) {
      return next(new Error('❌ ERROR: Missing authHeader or {refreshToken} in the body'));
    }
    const accessToken = authHeader.split('Bearer ')[1];
    if (await authHandler.isRefreshTokenValid(refreshToken)) {
      const user = await authHandler.getUserFromToken(accessToken);
      const sendToken = await authHandler.sendAuthTokens(user);
      jsend.data = sendToken.data;
      return response.status(200).json(jsend);
    }
    return next(new Error('❌ ERROR: refresh token is not valid'));
  }
}
module.exports = new AuthController();
