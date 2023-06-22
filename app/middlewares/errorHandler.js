const multer = require('multer');
/**
 * Error middleware handles error responses.
 * @namespace errorMiddleware
 */
const errorMiddleware = {
  /**
   * Handles 404 Not Found errors.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   */
  error404(request, response, next) {
    const error = new Error();
    error.code = 404;
    next(error);
  },
  /**
   * Handles various types of errors and sends appropriate responses.
   * @param {object} error - The error object.
   * @param {object} request - The HTTP request object.
   * @param {object} response - The HTTP response object.
   * @param {function} next - The next middleware function.
   */
  errorHandler(error, request, response, next) {
    if (error.code === '23505') {
      return response.status(400).json({ status: 'error', message: 'Bad Request: You are trying to send that data that already exist' });
    }
    if (error.code === 404) {
      return response.status(error.code).json({ status: 'error', message: 'Not Found: The requested resource could not be found.ssssss' });
    }
    if (error.code === 303) {
      return response.status(error.code).json({ status: 'error', message: 'See other: You are trying to send that data that already exist' });
    }
    if (error.code === 400) {
      return response.status(error.code).json({ status: 'error', message: 'Bad Request' });
    }
    if (error.code === 401) {
      return response.status(error.code).json({ status: 'error', message: 'Unauthorized: The request requires authentication, and the user is not authenticated or lacks valid credentials' });
    }
    if (error.code === 403) {
      return response.status(error.code).json({ status: 'error', message: 'Forbidden: The server understands the request, but the user does not have the necessary permissions.' });
    }
    if (error.name === 'ValidationError') {
      return response.status(422).json({ status: 'error', message: error.details.map((err) => err.message) });
    }
    if (error.message === 'Unexpected end of form') {
      return response.status(400).json({ status: 'error', message: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
      return response.status(400).json({ status: 'error', message: 'JsonWebTokenError: Malformed JWT' });
    }
    if (error.name === 'jwt expired') {
      return response.status(401).json({ status: 'error', message: 'TokenExpiredError: JWT expired' });
    }
    if (error instanceof multer.MulterError && error.code === 'LIMIT_UNEXPECTED_FILE') {
      return response.status(400).json({ status: 'error', message: 'Unexpected field: Please check the field name in your file upload' });
    }
    if (error instanceof multer.MulterError && error.code === 'INVALID_FILE_EXTENSION') {
      return response.status(400).json({ status: 'error', message: 'Invalid file extension: Please upload files with allowed extensions' });
    }
    return response.status(500).json({ status: 'fail', message: error.message });
  },
};

module.exports = errorMiddleware;
