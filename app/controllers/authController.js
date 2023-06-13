const debug = require('debug')('app:controllers:authController');
const bcrypt = require('bcrypt');
const dataMapper = require('../models/dataMapper');
const authHandler = require('../middlewares/authHandler');

const authController = {

  async handleLogin(request, response, next) {
    debug('login');
    const { email, password } = request.body;
    const result = await dataMapper.getByEmail(email);
    if (!result[0]) {
      debug('database: email not matching');
      const error = new Error();
      error.code = 401;
      return next(error);
    }

    debug('Comparing request.bodypassword with hashed db password...');
    const dbPassword = result[0].password;
    if (await bcrypt.compare(password, dbPassword)) {
      debug('✅ successfull login');
      return authController.sendAuthTokens(response, result[0]);
    }
    const error = new Error();
    error.code = 401;
    return next(error);
  },

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
      return authController.sendAuthTokens(response, user[0]);
    }
    return next(new Error('isRefreshTokenValid is not valid'));
  },

  async sendAuthTokens(response, user) {
    const accessToken = authHandler.generateAccessTokenWithUser(user);
    const refreshToken = authHandler.generateRefreshTokenForUser(user.id);
    debug('sendAuthTokens');
    await dataMapper.setRefreshToken(user.id, refreshToken);
    return response.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        permission_level: user.permission_level,
        accessToken,
        refreshToken,
      },
    });
  },
};

module.exports = authController;
