const renderLogin = (req, res) => {
  res.render('views/login');
};

const renderSignup = (req, res) => {
  res.render('views/signup');
};

const renderSignupSuccess = (req, res) => {
  res.render('views/signup-success', {
    email: req.session.email,
    userId: req.session.userId,
  });
};

const renderChangePassword = (req, res) => {
  res.render('views/change-password');
};

const renderResetPassword = (req, res) => {
  res.render('views/reset-password');
};

const renderRequestConfirmation = (req, res) => {
  res.render('views/request-confirmation');
};

const renderRequestForgotPasswordSuccess = (req, res) => {
  if (req.session.forgotPassword) {
    return res.render('views/request-forgot-password-success');
  }
  res.redirect('/');
};

export default {
  renderLogin,
  renderSignup,
  renderSignupSuccess,
  renderChangePassword,
  renderResetPassword,
  renderRequestConfirmation,
  renderRequestForgotPasswordSuccess,
};
