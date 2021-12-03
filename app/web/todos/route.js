const express = require('express');
const { authenticationMiddleware } = require('../../middlewares');
const todoWebController = require('./controller');

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

module.exports = router;
