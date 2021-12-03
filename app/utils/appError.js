const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
