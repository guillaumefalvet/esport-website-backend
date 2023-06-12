const debug = require('debug')('app:controllers:authController');
const bcrypt = require('bcrypt');
const dataMapper = require('../models/dataMapper');
const authHandler = require('../middlewares/authHandler');

const authController = {
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
    debug('match is : '+ await bcrypt.compare(password, dbPassword));
    if (await bcrypt.compare(password, dbPassword)) {
      return authController.sendTokens(response, request.ip, user);
    }
    jsonRes.message = 'wrong credentials password';
    return response.status(400).json(jsonRes);
  },
  async logout(request, response) {
    /* ADD THE DESTRUCTION OF THE LOGIN JWT */
    response.status(200).json({
      status: 'success',
    });
  },
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
  async sendTokens(response, ip, user) {
    const accessToken = authHandler.generateAccessToken(ip, user);
    const refreshToken = authHandler.generateRefreshToken(user.id);
    await dataMapper.setRefreshToken(user.id, refreshToken);
    return response.status(200).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  },
};

module.exports = authController;
