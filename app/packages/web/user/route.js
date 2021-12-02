import express from 'express';
import authenticationMiddleware from '../../../middlewares/auth.js';
import userWebController from './controller.js';

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

export default router;
