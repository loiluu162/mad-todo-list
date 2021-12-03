const express = require('express');
const { authenticationMiddleware } = require('../../middlewares');
const userWebController = require('./controller');

const router = express.Router();

router.get(
  '/changeAvatar',
  authenticationMiddleware,
  userWebController.renderChangeAvatar
);

router.get(
  '/profile',
  authenticationMiddleware,
  userWebController.renderProfile
);

module.exports = router;
