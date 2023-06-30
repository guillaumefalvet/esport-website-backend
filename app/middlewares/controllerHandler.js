const debug = require('debug')('app:middlewares:controllerHandler');

/**
 * Middleware function that wraps a controller action with error handling.
 *
 * @param {Function} controllerAction - The controller action function to execute.
 * @returns {Function} - The middleware function.
 */
const controllerHandler = (controllerAction) => async (request, response, next) => {
  try {
    debug('Checking for error...');
    await controllerAction(request, response, next); // Execute the controller action
    debug('No error found');
  } catch (error) {
    debug('Error found');
    next(error); // Pass the error to the error-handling middleware
  }
};

module.exports = controllerHandler;
