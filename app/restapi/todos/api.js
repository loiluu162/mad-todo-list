const { authenticationMiddleware } = require('../../middlewares');
const express = require('express');
const router = express.Router();

const ToDosController = require('./controller');
const Validator = require('./validator');

router.use(authenticationMiddleware);

router.get('/', ToDosController.getAllToDos);
router.get('/:id', ToDosController.getToDoById);
router.put('/complete/:id', ToDosController.toggleCompleted);
router.put('/', Validator.validate('updateToDo'), ToDosController.updateToDo);
router.delete('/:id', ToDosController.deleteToDoById);
router.post('/', Validator.validate('newToDo'), ToDosController.createToDo);

module.exports = router;
