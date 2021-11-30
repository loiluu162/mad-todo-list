const express = require('express');
const router = express.Router();

const { authenticationMiddleware } = require('../middlewares');
const webController = require('./controller');

router.get('/signup', webController.renderSignup);
router.get('/login', webController.renderLogin);
router.get('/profile', authenticationMiddleware, webController.renderProfile);
router.get('/', authenticationMiddleware, webController.renderHome);
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
