const debug = require('debug')('app:middleware:errorMiddleware');

const error404 = (request, response) => {
  response.status(404).json({ status: 'error', message: 'The requested resource could not be found.' });
};
const errorHandler = (error, request, response, next) => {
  debug('error Handler');
  debug(error);
  if (error.code === '23505') {
    return response.status(400).json({ status: 'Bad Request', message: 'You are trying to send that data that already exist' });
  }
  if (error.code === 404) {
    return response.status(error.code).json({ status: 'Not Found', message: error.message });
  }
  if (error.code === 401) {
    return response.status(error.code).json({ status: 'Unauthorized', message: 'The request requires authentication, and the user is not authenticated or lacks valid credentials' });
  }
  if (error.code === 403) {
    return response.status(error.code).json({ status: 'Forbidden', message: 'The server understands the request, but the user does not have the necessary permissions.' });
  }
  if (error.name === 'ValidationError') {
    return response.status(422).json({ status: 'Validation error', message: error.details.map((err) => err.message) });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ status: 'Bad Request', message: 'Malformed JWT' });
  }
  return response.status(500).json({ status: 'Internal Server', message: error.message });
};
module.exports = { error404, errorHandler };
