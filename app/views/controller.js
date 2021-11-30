const ToDoService = require('../todos/service');

exports.renderLogin = (req, res) => {
  res.render('views/login');
};

exports.renderProfile = (req, res) => {
  res.render('views/profile', {
    email: req.session.email,
  });
};
exports.renderSignup = (req, res) => {
  res.render('views/signup');
};
exports.renderHome = (req, res) => {
  res.render('views/home');
};
exports.renderCompletedHome = (req, res) => {
  res.render('views/completed');
};
exports.renderUncompletedHome = (req, res) => {
  res.render('views/uncompleted');
};
exports.renderUpdateTodo = async (req, res) => {
  const todo = await ToDoService.getToDoById(req.params.id);
  res.render('views/update', {
    todo,
  });
};
