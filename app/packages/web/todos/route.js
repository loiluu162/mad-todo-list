import express from 'express';
import authenticationMiddleware from '../../../middlewares/auth.js';
import todoWebController from './controller.js';

const router = express.Router();

router.get(
  '/calendar',
  authenticationMiddleware,
  todoWebController.renderCalendar
);

router.get(
  '/completed',
  authenticationMiddleware,
  todoWebController.renderCompletedHome
);

router.get(
  '/uncompleted',
  authenticationMiddleware,
  todoWebController.renderUncompletedHome
);

router.get(
  '/update/:id',
  authenticationMiddleware,
  todoWebController.renderUpdateTodo
);

router.get('/', authenticationMiddleware, todoWebController.renderHome);

export default router;
