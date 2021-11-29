const express = require('express');
const router = express.Router();

const ToDosController = require('./todosController');
const ToDosErrors = require('./todosErrors');

router.get('/', ToDosController.getAllToDos);
router.get('/:id', ToDosController.getToDoById);
router.put(
  '/',
  ToDosController.validate('updateToDo'),
  ToDosController.updateToDo
);
router.delete('/:id', ToDosController.deleteToDoById);
router.post(
  '/',
  ToDosController.validate('newToDo'),
  ToDosController.createToDo
);
router.use(ToDosErrors);

module.exports = router;
