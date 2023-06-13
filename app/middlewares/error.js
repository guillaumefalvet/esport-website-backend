const debug = require('debug')('app:middleware:errorMiddleware');

const error404 = (request, response) => {
  response.status(404).json({ status: 'error', message: 'invalid route' });
};
const errorHandler = (error, request, response) => {
  debug('error Handler');
  // logger.debug(error);
  // logger.error(error);
  if (error.code === '23505') {
    return response.status(400).json({ status: 'error', message: 'You are trying to send that data that already exist' });
  }
  if (error.code === 404) {
    return response.status(404).json({ status: 'error', message: error.message });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ status: 'error', errors: error.details.map((err) => err.message) });
  }
  return response.status(500).json({ status: 'error', message: error.message });
};
module.exports = { error404, errorHandler };
