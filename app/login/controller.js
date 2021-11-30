const { StatusCodes } = require('http-status-codes');
const LoginService = require('./service');
const { validationResult } = require('express-validator');
const { EmailUtils } = require('../utils');

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: StatusCodes.BAD_REQUEST, errors: errors.array() });
  }
  try {
    const user = await LoginService.login(req);
    req.session.loggedIn = true;
    req.session.email = user.email;
    req.session.userId = user.id;
    req.session.photoUrl = user.photoUrl;
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Successfully logged in',
    });
  } catch (e) {
    next(e);
  }
};
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: StatusCodes.BAD_REQUEST, errors: errors.array() });
  }
  try {
    await LoginService.signup(req);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Successfully signed up. Please check email for confirmation',
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res) => {
  req.session.destroy((_) => {
    res.redirect('/login');
  });
};
const requestForgotPassword = async (req, res, next) => {
  try {
    await EmailUtils.sendPasswordReset('loithui162@gmail.com', '123');
    return res.status(200).json({ message: 'sent!' });
  } catch (e) {
    next(e);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    await EmailUtils.sendPasswordReset('loithui162@gmail.com', '123');
    return res.status(200).json({ message: 'sent!' });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
  signup,
  forgotPassword,
  requestForgotPassword,
  logout,
};
