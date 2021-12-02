import { StatusCodes } from 'http-status-codes';
function todoErrors(err, req, res, next) {
  res.status(StatusCodes.BAD_REQUEST).json({
    status: StatusCodes.BAD_REQUEST,
    error: err.message,
  });
}

export default todoErrors;
