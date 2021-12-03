const { catchValidationError } = require('../../utils/');
const ToDosRepo = require('./repo');

exports.getToDoById = async (req) => {
  const { id } = req.params;
  const todo = await ToDosRepo.getToDoById(id);
  if (!todo) throw new Error('todo id not found');
  return todo;
};

exports.updateToDo = async (req) => {
  catchValidationError(req);
  const { id, newTaskName, newDeadline } = req.body;
  return await ToDosRepo.updateToDo(id, newTaskName, newDeadline);
};

exports.deleteToDoById = async (req) => {
  const { id } = req.params;
  if (!id) throw Error('todo id required');
  const todo = await ToDosRepo.getToDoById(id);
  if (todo) return await ToDosRepo.deleteToDoById(id);
};

exports.createToDo = async (req) => {
  catchValidationError(req);
  const userId = req.session.userId;
  const { taskName, deadline } = req.body;
  return await ToDosRepo.createToDo(taskName, userId, deadline);
};

exports.getAllToDos = async (req) => {
  const { completed, date } = req.query;
  const { userId } = req.session;
  if (completed) {
    return await ToDosRepo.getToDosByStatus(userId, completed);
  }
  if (date) {
    return await ToDosRepo.getAllToDosOnDay(userId, date);
  }
  return await ToDosRepo.getAllUserToDos(userId);
};

exports.getAllUserToDos = async (req) => {
  const { userId } = req.session;
  return await ToDosRepo.getAllUserToDos(userId);
};

exports.getToDoByStatus = async (req) => {
  const userId = req.session.userId;
  return await ToDosRepo.getToDosByStatus(userId, true);
};

exports.toggleCompleted = async (req) => {
  const { id } = req.params;
  return await ToDosRepo.toggleCompleted(id);
};

exports.getAllToDosOnDay = async (req) => {
  const { date } = req.params;
  return await ToDosRepo.getAllToDosOnDay(req.session.userId, date);
};
