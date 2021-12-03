const express = require('express');
const { authenticationMiddleware } = require('../../middlewares');
const router = express.Router();

const LoginController = require('./controller');

router.get('/signup', LoginController.renderSignup);

router.get('/signup-success', LoginController.renderSignupSuccess);

router.get('/login', LoginController.renderLogin);

router.get(
  '/changePassword',
  authenticationMiddleware,
  LoginController.renderChangePassword
);

router.get('/resetPassword', LoginController.renderResetPassword);

router.get(
  '/requestForgotPasswordSuccess',
  LoginController.renderRequestForgotPasswordSuccess
);

router.get('/requestConfirmation', LoginController.renderRequestConfirmation);

module.exports = router;
