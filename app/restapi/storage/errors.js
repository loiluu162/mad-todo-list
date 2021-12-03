const { StatusCodes } = require('http-status-codes');

function todoErrors(err, req, res, next) {
  res.status(StatusCodes.BAD_REQUEST).json({
    status: StatusCodes.BAD_REQUEST,
    error: err.message,
    location: 'CUSTOM FOR STORAGE',
  });
}

module.exports = todoErrors;
