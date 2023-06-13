const debug = require('debug')('app:middleware:errorMiddleware');

const error404 = (request, response) => {
  response.status(404).json({ status: 'error', message: 'Not Found: The requested resource could not be found.' });
};
const errorHandler = (error, request, response, next) => {
  debug('error Handler');
  debug(error);
  if (error.code === '23505') {
    return response.status(400).json({ status: 'error', message: 'Bad Request: You are trying to send that data that already exist' });
  }
  if (error.code === 404) {
    return response.status(error.code).json({ status: 'error', message: 'Not Found: The requested resource could not be found.' });
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
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ status: 'error', message: 'JsonWebTokenError: Malformed JWT' });
  }
  if (error.name === 'jwt expired') {
    return response.status(401).json({ status: 'error', message: 'TokenExpiredError: JWT expired' });
  }
  return response.status(500).json({ status: 'fail', message: error.message });
};
module.exports = { error404, errorHandler };
