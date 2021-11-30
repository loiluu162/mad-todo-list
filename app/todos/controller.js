const ToDosService = require('./service');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
exports.getToDoById = async (req, res, next) => {
  try {
    const todo = await ToDosService.getToDoById(req);
    return res.status(StatusCodes.OK).json({
      content: todo,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateToDo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: StatusCodes.BAD_REQUEST, errors: errors.array() });
  }
  try {
    const newToDo = await ToDosService.updateToDo(req);
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Successfully updated todo',
      data: newToDo,
    });
  } catch (e) {
    next(e);
  }
};
exports.deleteToDoById = async (req, res, next) => {
  try {
    await ToDosService.deleteToDoById(req);
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Successfully deleted todo',
    });
  } catch (e) {
    next(e);
  }
};
exports.createToDo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: StatusCodes.BAD_REQUEST, errors: errors.array() });
  }
  try {
    const newTodo = await ToDosService.createToDo(req);
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Successfully created new todo',
      status: StatusCodes.ACCEPTED,
      newTodo,
    });
  } catch (e) {
    next(e);
  }
};
exports.getAllToDos = async (req, res, next) => {
  const todoList = await ToDosService.getAllToDos(req);
  return res.status(StatusCodes.OK).json({
    content: todoList,
  });
};
exports.getAllUserToDos = async (req, res, next) => {
  return await ToDosService.getAllUserToDos(req);
};

exports.getToDoCompleted = async (req, res, next) => {
  const todoList = await ToDosService.getToDoByStatus(true);
  return res.status(StatusCodes.OK).json({
    content: todoList,
  });
};
exports.getToDoNotCompleted = async (req, res, next) => {
  const todoList = await ToDosService.getToDoByStatus(false);
  return res.status(StatusCodes.OK).json({
    content: todoList,
  });
};
exports.toggleCompleted = async (req, res, next) => {
  try {
    const result = await ToDosService.toggleCompleted(req);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'OK',
      content: result,
    });
  } catch (e) {
    next(e);
  }
};
