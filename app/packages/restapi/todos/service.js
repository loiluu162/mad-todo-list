import { validationResult } from 'express-validator';
import ToDosRepo from './repo.js';

const getToDoById = async (id) => {
  const todo = await ToDosRepo.getToDoById(id);
  if (!todo) throw new Error('todo id not found');
  return todo;
};

const updateToDo = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  const { id, newTaskName, newDeadline } = req.body;
  return await ToDosRepo.updateToDo(id, newTaskName, newDeadline);
};

const deleteToDoById = async (req) => {
  const { id } = req.params;
  if (!id) throw Error('todo id required');
  const todo = await ToDosRepo.getToDoById(id);
  if (todo) return await ToDosRepo.deleteToDoById(id);
};

const createToDo = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  const userId = req.session.userId;
  const { taskName, deadline } = req.body;
  return await ToDosRepo.createToDo(taskName, userId, deadline);
};

const getAllToDos = async (req) => {
  const { completed, date } = req.query;
  const { userId } = req.session;
  if (completed) {
    return await ToDosRepo.getToDosByStatus(userId, completed);
  }
  if (date !== undefined) {
    return await ToDosRepo.getAllToDosOnDay(userId, date);
  }
  //
  return await ToDosRepo.getAllUserToDos(userId);
};

const getAllUserToDos = async (req) => {
  const { userId } = req.session;
  return await ToDosRepo.getAllUserToDos(userId);
};

const getToDoByStatus = async (req) => {
  const userId = req.session.userId;
  return await ToDosRepo.getToDosByStatus(userId, true);
};

const toggleCompleted = async (req) => {
  const { id } = req.params;
  return await ToDosRepo.toggleCompleted(id);
};

export default {
  getToDoById,
  updateToDo,
  deleteToDoById,
  createToDo,
  getAllToDos,
  getAllUserToDos,
  getToDoByStatus,
  toggleCompleted,
};
