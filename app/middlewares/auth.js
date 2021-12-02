function authenticationMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  }
  res.redirect('/login');
}

export default authenticationMiddleware;
