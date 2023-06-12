const express = require('express');
const controllerHandler = require('../../middlewares/controllerHandler');
const { loginValidation } = require('../../validations/schemas/login-schema');
const validate = require('../../validations/validate');
const authController = require('../../controllers/authController');

const router = express.Router();

/**
 * @typedef {object} LoginRequestBody
 * @property {string} email - The email for login.
 * @property {string} password - The password for login.
 */

/**
 * POST /api/auth/login
 *
 * @summary Handles user login.
 * @tags Authentication
 *
 * @requestBody {LoginRequestBody} request.body - The login request body.
 *
 * @returns {object} 200 - Successful login.
 * @returns {object} 400 - Invalid credentials (wrong email or password).
 * @returns {object} 500 - Internal server error.
 */
router.post('/login', validate(loginValidation), controllerHandler(authController.login));

/**
 * POST /api/auth/refresh-token
 *
 * @summary Refreshes the access token using a refresh token.
 * @tags Authentication
 *
 * @requestBody {object} Request body
 * @requestBodyExample {object} Example request body
 *     {
 *       "refreshToken": "your_refresh_token_here"
 *     }
 *
 * @returns {object} 200 - Success response with new access and refresh tokens.
 * @returns {object} 401 - Unauthorized access.
 * @returns {object} 500 - Internal server error.
 */
router.post('/refresh-token', controllerHandler(authController.tokenRefresh));

module.exports = router;
