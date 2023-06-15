const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { loginValidation } = require('../../validations/schemas/login-schema');
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
 * @param {LoginRequest} request.body - User login credentials

 */
router.post('/login', validate(loginValidation), controllerHandler(authController.handleLogin));

/**
 * POST /api/auth/refresh-token
 * @group Auth - Authentication
 * @tags Authentication
 * @param {RefreshRequest} request.body - Request body
 */
router.post('/refresh-token', controllerHandler(authController.handleTokenRefresh));

module.exports = router;
