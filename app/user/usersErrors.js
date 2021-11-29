function logErrors(err, req, res, next) {
  next(err);
}
module.exports = logErrors;
