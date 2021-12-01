const { StatusCodes } = require('http-status-codes');
const LoginService = require('./service');

const login = async (req, res, next) => {
  try {
    await LoginService.login(req);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Successfully logged in',
    });
  } catch (e) {
    next(e);
  }
};
const signup = async (req, res, next) => {
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
    await LoginService.requestForgotPassword(req);
    return res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, message: 'Reset password email sent' });
  } catch (e) {
    next(e);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    await LoginService.resetPassword(req);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Password successfully reset',
    });
  } catch (e) {
    next(e);
  }
};
const verifyPasswordResetToken = async (req, res, next) => {
  try {
    await LoginService.verifyPasswordResetToken(req);
    return res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, message: 'Token valid' });
  } catch (e) {
    next(e);
  }
};
const verifyEmail = async (req, res, next) => {
  try {
    await LoginService.verifyEmail(req);
    return res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, message: 'Email successfully verified' });
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    await LoginService.changePassword(req);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Password successfully changed',
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  login,
  signup,
  resetPassword,
  requestForgotPassword,
  logout,
  verifyEmail,
  verifyPasswordResetToken,
  changePassword,
};
