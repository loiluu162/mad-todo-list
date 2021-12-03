const ToDoService = require('../../restapi/todos/service.js');

const renderCompletedHome = (req, res) => {
  res.render('views/completed');
};

const renderUncompletedHome = (req, res) => {
  res.render('views/uncompleted');
};

const renderCalendar = (req, res) => {
  res.render('views/calendar');
};

const renderUpdateTodo = async (req, res) => {
  const todo = await ToDoService.getToDoById(req);
  todo.deadline_date = todo.deadline_date.toISOString().slice(0, 16);
  res.render('views/update', {
    todo,
  });
};

const renderHome = (req, res) => {
  res.render('views/home');
};

module.exports = {
  renderCompletedHome,
  renderUncompletedHome,
  renderCalendar,
  renderUpdateTodo,
  renderHome,
};
