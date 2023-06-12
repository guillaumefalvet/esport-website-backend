const debug = require('debug')('app:controllers:authController');
const bcrypt = require('bcrypt');
const dataMapper = require('../models/dataMapper');

module.exports = {
  async login(request, response) {
    debug('login controller');
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
      jsonRes.status = 'success';
      return response.status(200).json(jsonRes);
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
};
