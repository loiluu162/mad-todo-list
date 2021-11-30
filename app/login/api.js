const express = require('express');
const router = express.Router();

const LoginController = require('./controller');
const loginErrors = require('./errors');
const Validator = require('./validator');
router.post('/login', Validator.validate('login'), LoginController.login);
router.post('/signup', Validator.validate('signup'), LoginController.signup);
router.post(
  '/forgotPassword',
  Validator.validate('forgotPassword'),
  LoginController.forgotPassword
);
router.get('/requestForgotPassword', LoginController.requestForgotPassword);
router.get('/logout', LoginController.logout);

router.use(loginErrors);

module.exports = router;
