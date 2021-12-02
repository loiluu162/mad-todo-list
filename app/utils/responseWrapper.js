import { StatusCodes } from 'http-status-codes';

export const message = (res, message, content, statusCode = StatusCodes.OK) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    content,
  });
};

export const error = (res, error, statusCode = StatusCodes.BAD_REQUEST) => {
  return res.status(statusCode).json({
    status: statusCode,
    error,
  });
};

export default { error, message };
