const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const auth = require('../../middlewares/auth');
const { loginValidation } = require('../../validations/schemas/login-schema');
const validate = require('../../validations/validate');
const { authController } = require('../../controllers');

const router = express.Router();
/**
 * a login type
 *
 * @typedef {object} Login
 * @property {string} email - login email
 * @property {string} password - login password
 */

/**
 * POST /api/login
 *
 * @summary login for a non authentified user
 * @param {Login} request.body
 * @returns {object} 200 - successful login
 * @returns {object} 401 - invalid credentials
 */
router.post('/login', validate(loginValidation), controllerHandler(authController.login));

/**
 * GET /api/logout
 * @summary logout for an authentified user
 * @returns {object} 200 - successful logout
 * @returns {object} 404 - unsuccessful action
 */
router.get('/logout', auth, controllerHandler(authController.logout));
module.exports = router;
