import express from 'express';
import LoginController from './controller.js';
import loginErrors from './errors.js';
import validate from './validator.js';
const router = express.Router();

router.post('/login', validate('login'), LoginController.login);

router.post('/signup', validate('signup'), LoginController.signup);

router.post(
  '/resetPassword',
  validate('resetPassword'),
  LoginController.resetPassword
);

router.post(
  '/changePassword',
  validate('changePassword'),
  LoginController.changePassword
);

router.post(
  '/verifyPasswordResetToken',
  validate('verifyPasswordResetToken'),
  LoginController.verifyPasswordResetToken
);

router.post(
  '/requestForgotPassword',
  validate('requestForgotPassword'),
  LoginController.requestForgotPassword
);

router.get('/logout', LoginController.logout);

router.post(
  '/verifyEmail',
  validate('verifyEmail'),
  LoginController.verifyEmail
);

router.use(loginErrors);

export default router;
