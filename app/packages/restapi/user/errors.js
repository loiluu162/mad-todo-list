import { StatusCodes } from 'http-status-codes';

function errors(err, req, res, next) {
  res.status(StatusCodes.BAD_REQUEST).json({
    status: StatusCodes.BAD_REQUEST,
    error: err.message,
  });
}
export default errors;
