import express from 'express';
import LoginController from './controller.js';

import authenticationMiddleware from '../../../middlewares/auth.js';
const router = express.Router();

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

export default router;
