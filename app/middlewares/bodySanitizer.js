const sanitizer = require('sanitizer');

module.exports = (request, _, next) => {
  if (request.body) {
    Object.keys(request.body).forEach((method) => {
      request.body[method] = sanitizer.escape(request.body[method]);
    });
  }
  next();
};
