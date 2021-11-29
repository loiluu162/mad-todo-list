const express = require('express');
const router = express.Router();

const LoginController = require('./loginController');
const loginErrors = require('./loginErrors');

router.post('/login', LoginController.login);
router.post('/signup', LoginController.signup);

router.use(loginErrors);

module.exports = router;
