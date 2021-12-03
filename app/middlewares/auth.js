const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/appError');
function authenticationMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  }

  if (req.originalUrl.startsWith('/api')) {
    throw new AppError('You need to be logged in', StatusCodes.FORBIDDEN);
  }
  res.redirect('/login');
}

module.exports = authenticationMiddleware;
