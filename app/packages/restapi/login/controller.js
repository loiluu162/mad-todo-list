import LoginService from './service.js';

import { message } from '../../../utils/responseWrapper.js';

const login = async (req, res, next) => {
  try {
    await LoginService.login(req);
    return message(res, 'Successfully logged in', null);
  } catch (e) {
    next(e);
  }
};

const signup = async (req, res, next) => {
  try {
    await LoginService.signup(req);
    return message(res, 'Successfully singed up', null);
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
    return message(res, 'Reset password email sent', null);
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await LoginService.resetPassword(req);
    return message(res, 'Password successfully reset', null);
  } catch (e) {
    next(e);
  }
};

const verifyPasswordResetToken = async (req, res, next) => {
  try {
    await LoginService.verifyPasswordResetToken(req);
    return message(res, 'Token valid');
  } catch (e) {
    next(e);
  }
};
const verifyEmail = async (req, res, next) => {
  try {
    await LoginService.verifyEmail(req);
    return message(res, 'Email successfully verified');
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    await LoginService.changePassword(req);
    return message(res, 'Password successfully changed');
  } catch (e) {
    next(e);
  }
};

export default {
  login,
  signup,
  resetPassword,
  requestForgotPassword,
  logout,
  verifyEmail,
  verifyPasswordResetToken,
  changePassword,
};
