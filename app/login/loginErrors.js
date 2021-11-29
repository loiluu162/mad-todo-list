function loginErrors(err, req, res, next) {
  console.log('ERROR', err);
  //   next(err);
  res.redirect('/login');
}
module.exports = loginErrors;
