const express = require('express');
const router = express.Router();

const LoginController = require('./loginController');
const loginErrors = require('./loginErrors');

router.post('/login', LoginController.validate('login'), LoginController.login);
router.post(
  '/signup',
  LoginController.validate('signup'),
  LoginController.signup
);
router.get('/logout', LoginController.signup);

router.use(loginErrors);

module.exports = router;
