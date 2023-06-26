const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { loginValidation, refreshToken } = require('../../validations/schemas/login-schema');
const validate = require('../../validations/validate');
const authController = require('../../controllers/authController');

const router = express.Router();
/**
 * @typedef {object} LoginRequest
 * @property {string} email - User's email
 * @property {string} password - User's password
 */

/**
 * @typedef {object} RefreshRequest
 * @property {string} refreshToken -User's refresh Token

 */

/**
 * POST /api/auth/login
 * @group Auth - Authentication
 * @tags Authentication
 * @param {LoginRequest} request.body.required - User login credentials
 * @returns {object} 200 - successful
 * @example response - 200 - success response example
 * {
 *  "status": "success",
 *  "data": {
 *   "accessToken": "access token here",
 *   "refreshToken": "refresh token here"
 *  }
 * }
 * @returns {object} 401 - wrong credentials
 */
router.post('/login', validate(loginValidation), controllerHandler(authController.handleLogin.bind(authController)));

/**
 * POST /api/auth/refresh-token
 * @group Auth - Authentication
 * @tags Authentication
 * @param {RefreshRequest} request.body.required - Request body
 * @returns {object} 200 - successful
 * @example response - 200 - success response example
 * {
 *  "status": "success",
 *  "data": {
 *   "accessToken": "access token here",
 *   "refreshToken": "refresh token here"
 *  }
 * }
 * @returns {object} 400 - bad request
 * @returns {object} 400 - Unauthorized
 */
router.post('/refresh-token', validate(refreshToken), controllerHandler(authController.handleTokenRefresh.bind(authController)));

module.exports = router;
