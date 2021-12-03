const { StatusCodes } = require('http-status-codes');

function loginErrors(err, req, res, next) {
  res.status(StatusCodes.BAD_REQUEST).json({
    status: StatusCodes.BAD_REQUEST,
    error: err.message,
    location: 'CUSTOM FOR LOGIN',
  });
}

module.exports = loginErrors;
