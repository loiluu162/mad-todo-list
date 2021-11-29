const express = require('express');
const router = express.Router();

const LoginController = require('./loginController');
const loginErrors = require('./loginErrors');
const Validator = require('./validator');
router.post('/login', Validator.validate('login'), LoginController.login);
router.post('/signup', Validator.validate('signup'), LoginController.signup);
router.post(
  '/forgotPassword',
  Validator.validate('forgotPassword'),
  LoginController.forgotPassword
);
router.get('/logout', LoginController.signup);

router.use(loginErrors);

module.exports = router;
