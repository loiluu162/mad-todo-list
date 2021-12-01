const express = require('express');
const router = express.Router();

const ToDosController = require('./controller');
const ToDosErrors = require('./errors');
const Validator = require('./validator');

router.get('/', ToDosController.getAllToDos);
router.get('/date/:date', ToDosController.getAllToDosOnDay);
router.get('/:id', ToDosController.getToDoById);
router.put('/complete/:id', ToDosController.toggleCompleted);
router.put('/', Validator.validate('updateToDo'), ToDosController.updateToDo);
router.delete('/:id', ToDosController.deleteToDoById);
router.post('/', Validator.validate('newToDo'), ToDosController.createToDo);
router.use(ToDosErrors);

module.exports = router;
