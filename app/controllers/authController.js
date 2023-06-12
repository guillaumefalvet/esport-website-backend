const debug = require('debug')('app:controllers:authController');
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
    // if nothing was found in the database
    if (!result[0]) {
      debug('database: email not matching');
      jsonRes.status = 'error';
      jsonRes.message = 'wrong credentials';
      return response.status(400).json(jsonRes);
    }
    // add bcrypt here
    // if password and database password don't match
    if (password === result[0].password) {
      debug(`user email: ${result[0].email}`);
      debug(`user id: ${result[0].id}`);
      debug(`user ip: ${request.ip}`);
      debug(`user permission_name: ${result[0].permission_name}`);
      debug(`user permission_level: ${result[0].permission_level}`);
      const user = result[0];
      return authController.sendTokens(response, request.ip, user);
    }
    return next(new Error('Unauthorized'));
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
