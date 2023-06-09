const debug = require('debug')('app:controllers:authController');
const dataMapper = require('../models/dataMapper');

module.exports = {
  async login(request, response) {
    debug('login controller');
    const { email, password } = request.body;
    const jsonRes = {
      status: '',
    };
    // if there is no request email
    if (!email) {
      debug('no email');
      jsonRes.status = 'error';
      jsonRes.message = 'require an email';
      return response.status(400).json(jsonRes);
    }
    // if there is no request password
    if (!password) {
      debug('no password');
      jsonRes.status = 'error';
      jsonRes.message = 'require a password';
      return response.status(400).json(jsonRes);
    }

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
    if (password !== result[0].password) {
      debug('database: password not matching');
      jsonRes.status = 'error';
      jsonRes.message = 'wrong credentials';
      return response.status(400).json(jsonRes);
    }
    // if everything went well
    jsonRes.status = 'success';
    jsonRes.data = {
      id: result[0].id,
      user_name: result[0].user_name,
      permission_name: result[0].permission_name,
      permission_level: result[0].permission_level,
    };
    request.session.profile = {
      id: result[0].id,
      permission_level: result[0].permission_level,
    };
    debug(`session created id: ${request.session.profile.id}`);
    debug(`session created permission_level: ${request.session.profile.permission_level}`);
    debug('successful login');
    return response.status(200).json(jsonRes);
    // add session
  },
  async logout(request, response) {
    request.session.destroy((err) => {
      debug('Destroyed session');
    });
    response.status(200).json({
      status: 'success',
    });
  },
};
