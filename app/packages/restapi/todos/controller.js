import ToDosService from './service.js';
import { StatusCodes } from 'http-status-codes';

import { message } from '../../../utils/responseWrapper.js';

const getToDoById = async (req, res, next) => {
  try {
    const todo = await ToDosService.getToDoById(req);
    return res.status(StatusCodes.OK).json({
      content: todo,
    });
  } catch (err) {
    next(err);
  }
};

const updateToDo = async (req, res, next) => {
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

const deleteToDoById = async (req, res, next) => {
  try {
    await ToDosService.deleteToDoById(req);
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Successfully deleted todo',
    });
  } catch (e) {
    next(e);
  }
};

const createToDo = async (req, res, next) => {
  try {
    const newTodo = await ToDosService.createToDo(req);
    return message(
      res,
      'Successfully created new todo',
      newTodo,
      StatusCodes.ACCEPTED
    );
  } catch (e) {
    next(e);
  }
};

const getAllToDos = async (req, res, next) => {
  const todoList = await ToDosService.getAllToDos(req);
  return message(
    res,
    'Successfully created new todo',
    todoList,
    StatusCodes.ACCEPTED
  );
};

const getAllUserToDos = async (req, res, next) => {
  return await ToDosService.getAllUserToDos(req);
};

const getToDoCompleted = async (req, res, next) => {
  const todoList = await ToDosService.getToDoByStatus(true);
  return res.status(StatusCodes.OK).json({
    content: todoList,
  });
};

const getToDoNotCompleted = async (req, res, next) => {
  const todoList = await ToDosService.getToDoByStatus(false);
  return res.status(StatusCodes.OK).json({
    content: todoList,
  });
};

const toggleCompleted = async (req, res, next) => {
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

// const getAllToDosOnDay = async (req, res, next) => {
//   try {
//     const result = await ToDosService.getAllToDosOnDay(req);
//     return res.status(StatusCodes.OK).json({
//       status: StatusCodes.OK,
//       message: 'OK',
//       content: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

export default {
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
