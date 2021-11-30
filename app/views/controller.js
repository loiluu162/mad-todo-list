exports.renderLogin = (req, res) => {
  res.render('views/login');
};

exports.renderProfile = (req, res) => {
  res.render('views/profile', {
    email: req.session.email,
  });
};
exports.renderSignup = (req, res) => {
  res.render('views/signup');
};
exports.renderHome = (req, res) => {
  res.render('views/home');
};
