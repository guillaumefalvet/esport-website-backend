const debug = require('debug')('app:validations');

/**
 * Factory returning a validation middleware.
 *
 * @param {Object} schema - A validation schema object used to validate the request body.
 * @returns {Function} A validation middleware function.
 */
function validate(schema) {
  debug('create a new validation middleware');

  /**
   * Validation middleware function.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  return async (request, response, next) => {
    try {
      await schema.validateAsync(request.body);
      next();
    } catch (err) {
      debug('Validation error');
      next(err);
    }
  };
}

module.exports = validate;
