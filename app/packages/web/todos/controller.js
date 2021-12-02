import ToDoService from '../../restapi/todos/service.js';

export const renderCompletedHome = (req, res) => {
  res.render('views/completed');
};

export const renderUncompletedHome = (req, res) => {
  res.render('views/uncompleted');
};

export const renderCalendar = (req, res) => {
  res.render('views/calendar');
};

export const renderUpdateTodo = async (req, res) => {
  const todo = await ToDoService.getToDoById(req.params.id);
  todo.deadline_date = todo.deadline_date.toISOString().slice(0, 16);
  console.log(todo);

  res.render('views/update', {
    todo,
  });
};

export const renderHome = (req, res) => {
  res.render('views/home');
};

export default {
  renderCompletedHome,
  renderUncompletedHome,
  renderCalendar,
  renderUpdateTodo,
  renderHome,
};
