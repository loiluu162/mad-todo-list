const ToDosRepo = require('./repo');

exports.getToDoById = async (id) => {
  const todo = await ToDosRepo.getToDoById(id);
  if (!todo) throw new Error('todo id not found');
  return todo;
};
exports.updateToDo = async (req) => {
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
  const userId = req.session.userId;
  const { taskName, deadline } = req.body;
  return await ToDosRepo.createToDo(taskName, userId, deadline);
};
exports.getAllToDos = async (req) => {
  const { completed, page, limit } = req.query;
  const { userId } = req.session;
  if (completed) {
    return await ToDosRepo.getToDosByStatus(userId, completed);
  }
  if (page && limit) {
    return await ToDosRepo.getAllUserToDos(userId);
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
