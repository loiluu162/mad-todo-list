const express = require('express');
const router = express.Router();

const { authenticationMiddleware } = require('../middlewares');
const webController = require('./controller');

router.get('/signup', webController.renderSignup);
router.get('/signup-success', webController.renderSignupSuccess);
router.get('/login', webController.renderLogin);
router.get(
  '/changePassword',
  authenticationMiddleware,
  webController.renderChangePassword
);
router.get('/resetPassword', webController.renderResetPassword);
router.get(
  '/requestForgotPasswordSuccess',
  webController.renderRequestForgotPasswordSuccess
);
router.get('/requestConfirmation', webController.renderRequestConfirmation);
router.get(
  '/changeAvatar',
  authenticationMiddleware,
  webController.renderChangeAvatar
);
router.get('/profile', authenticationMiddleware, webController.renderProfile);
router.get('/', authenticationMiddleware, webController.renderHome);
router.get('/calendar', authenticationMiddleware, webController.renderCalendar);
router.get(
  '/completed',
  authenticationMiddleware,
  webController.renderCompletedHome
);
router.get(
  '/uncompleted',
  authenticationMiddleware,
  webController.renderUncompletedHome
);
router.get(
  '/update/:id',
  authenticationMiddleware,
  webController.renderUpdateTodo
);

module.exports = router;
