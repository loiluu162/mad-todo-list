function todoErrors(err, req, res, next) {
  res.status(400).json({
    status: 400,
    error: err.message,
  });
}
module.exports = todoErrors;
