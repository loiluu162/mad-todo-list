const ToDosService = require('./todosService');
const UsersService = require('../user/usersService');
const { body, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

exports.getToDoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    return await ToDosService.getToDoById(id);
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
    const { id, newTaskName, newDeadline } = req.body;
    await ToDosService.updateToDo(id, newTaskName, newDeadline);
    return res.status(StatusCodes.ACCEPTED).json({
      message: `Successfully updated todo had id ${id}`,
    });
  } catch (e) {
    next(e);
  }
};
exports.deleteToDoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw Error('todo id required');
    const todo = await ToDosService.getToDoById(id);
    if (todo) await ToDosService.deleteToDoById(id);
    return res.status(StatusCodes.ACCEPTED).json({
      message: `Successfully delete todo had id ${id}`,
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
    const userId = req.session.userId;
    const { taskName, deadline } = req.body;
    await ToDosService.createToDo(taskName, userId, deadline);
    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Successfully created new todo',
    });
  } catch (e) {
    next(e);
  }
};
exports.getAllToDos = async (req, res, next) => {
  const todoList = await ToDosService.getAllToDos();
  return res.status(StatusCodes.OK).json({
    data: todoList,
  });
};
exports.getAllUserToDos = async (req, res, next) => {
  const email = req.session.email;
  return await ToDosService.getAllUserToDos(email);
};

exports.validate = (method) => {
  switch (method) {
    case 'newToDo': {
      return [
        body('taskName', 'Task name required ').exists().trim(),
        body('deadline', 'Deadline need to be type Date')
          .exists()
          .isISO8601()
          .toDate(),
        body('taskName').custom((_, { req }) => {
          return UsersService.isExistsUserId(req.session.userId).then(
            (existed) => {
              if (!existed) {
                throw new Error('User not exists or still not been verified');
              }
            }
          );
        }),
      ];
    }
    case 'updateToDo': {
      return [
        body('id', 'Todo id required ').exists().isInt(),
        body('id').custom((id, { req }) => {
          return ToDosService.getToDoById(id)
            .then((todo) => {
              const userId = req.session.userId;
              if (todo.user_id !== userId) {
                return Promise.reject(
                  new Error('User has no right to edit this todo')
                );
              }
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }),
        body('newTaskName', 'Task name required ').exists().trim(),
        body('newDeadline', 'Deadline need to be type Date')
          .exists()
          .isISO8601()
          .toDate(),
      ];
    }
  }
};
