import express from 'express';

import ToDosController from './controller.js';
import ToDosErrors from './errors.js';
import validate from './validator.js';

const router = express.Router();

router.get('/', ToDosController.getAllToDos);

router.get('/:id', ToDosController.getToDoById);

router.put('/complete/:id', ToDosController.toggleCompleted);

router.put('/', validate('updateToDo'), ToDosController.updateToDo);

router.delete('/:id', ToDosController.deleteToDoById);

router.post('/', validate('newToDo'), ToDosController.createToDo);

router.use(ToDosErrors);

export default router;
