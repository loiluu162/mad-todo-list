exports.renderLogin = (req, res) => {
  res.render('web/views/login');
};

exports.renderProfile = (req, res) => {
  res.render('web/views/profile', {
    username: req.session.username,
  });
};
exports.renderSignup = (req, res) => {
  res.render('web/views/signup');
};
exports.renderHome = (req, res) => {
  res.render('web/views/home');
};
