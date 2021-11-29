const ToDosDAL = require('./todosDAL');

exports.getToDoById = async (id) => {
  const todo = await ToDosDAL.getToDoById(id);
  if (!todo) throw new Error('todo id not found');
  return todo;
};
exports.updateToDo = async (id, newTaskName, newDeadline) => {
  return await ToDosDAL.updateToDo(id, newTaskName, newDeadline);
};
exports.deleteToDoById = async (id) => {
  return await ToDosDAL.deleteToDoById(id);
};
exports.createToDo = async (taskName, userId, deadline) => {
  return await ToDosDAL.createToDo(taskName, userId, deadline);
};
exports.getAllToDos = async () => {
  return await ToDosDAL.getAllToDos();
};
exports.getAllUserToDos = async (email) => {
  return await ToDosDAL.getAllUserToDos(email);
};

exports.isExistToDo = async (id) => {
  return await ToDosDAL.isExistToDo(id);
};
