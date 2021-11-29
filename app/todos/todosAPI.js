const express = require('express');
const router = express.Router();

const ToDosController = require('./todosController');
const ToDosErrors = require('./todosErrors');
const Validator = require('./validator');

router.get('/', ToDosController.getAllToDos);
router.get('/:id', ToDosController.getToDoById);
router.put('/', Validator.validate('updateToDo'), ToDosController.updateToDo);
router.delete('/:id', ToDosController.deleteToDoById);
router.post('/', Validator.validate('newToDo'), ToDosController.createToDo);
router.use(ToDosErrors);

module.exports = router;
