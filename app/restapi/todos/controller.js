const ToDosService = require('./service');
const { catchAsync } = require('../../utils');
const { messageResponse: message } = require('../../utils/response');

const getToDoById = catchAsync(async (req, res, next) => {
  const todo = await ToDosService.getToDoById(req);
  return message(res, 'Success', todo);
});

const updateToDo = catchAsync(async (req, res, next) => {
  const newToDo = await ToDosService.updateToDo(req);
  return message(res, 'Successfully updated todo', newToDo);
});

const deleteToDoById = catchAsync(async (req, res, next) => {
  await ToDosService.deleteToDoById(req);
  return message(res, 'Successfully deleted todo');
});

const createToDo = catchAsync(async (req, res, next) => {
  const newTodo = await ToDosService.createToDo(req);
  return message(res, 'Successfully created new todo', newTodo);
});

const getAllToDos = catchAsync(async (req, res, next) => {
  const result = await ToDosService.getAllToDos(req);
  return message(res, 'Success', result);
});

const getAllUserToDos = catchAsync(async (req, res, next) => {
  const result = await ToDosService.getAllUserToDos(req);
  return message(res, 'Success', result);
});

const getToDoCompleted = catchAsync(async (req, res, next) => {
  const result = await ToDosService.getToDoByStatus(true);
  return message(res, 'Success', result);
});

const getToDoNotCompleted = catchAsync(async (req, res, next) => {
  const result = await ToDosService.getToDoByStatus(false);
  return message(res, 'Success', result);
});

const toggleCompleted = catchAsync(async (req, res, next) => {
  const result = await ToDosService.toggleCompleted(req);
  return message(res, 'Success', result);
});

module.exports = {
  getToDoById,
  createToDo,
  deleteToDoById,
  getAllToDos,
  getAllUserToDos,
  toggleCompleted,
  getToDoCompleted,
  getToDoNotCompleted,
  updateToDo,
};
