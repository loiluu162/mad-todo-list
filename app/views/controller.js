const ToDoService = require('../features/todos/service');

exports.renderLogin = (req, res) => {
  res.render('views/login');
};

exports.renderProfile = (req, res) => {
  res.render('views/profile', {
    email: req.session.email,
    userId: req.session.userId,
  });
};
exports.renderSignup = (req, res) => {
  res.render('views/signup');
};
exports.renderSignupSuccess = (req, res) => {
  res.render('views/signup-success', {
    email: req.session.email,
    userId: req.session.userId,
  });
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
exports.renderCalendar = (req, res) => {
  res.render('views/calendar');
};
exports.renderUpdateTodo = async (req, res) => {
  const todo = await ToDoService.getToDoById(req.params.id);
  todo.deadline_date = todo.deadline_date.toISOString().slice(0, 16);
  console.log(todo);

  res.render('views/update', {
    todo,
  });
};
exports.renderChangePassword = (req, res) => {
  res.render('views/change-password');
};
exports.renderResetPassword = (req, res) => {
  res.render('views/reset-password');
};
exports.renderRequestConfirmation = (req, res) => {
  res.render('views/request-confirmation');
};
exports.renderChangeAvatar = (req, res) => {
  res.render('views/change-avatar');
};
exports.renderRequestForgotPasswordSuccess = (req, res) => {
  if (req.session.forgotPassword) {
    return res.render('views/request-forgot-password-success');
  }
  res.redirect('/');
};
