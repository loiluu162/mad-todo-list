const { body } = require('express-validator');
const ToDosRepo = require('./repo');
const UsersRepo = require('../user/repo');
const AppError = require('../../utils/appError');
const { StatusCodes } = require('http-status-codes');

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
          return UsersRepo.isExistsUserId(req.session.userId).then(
            (existed) => {
              if (!existed) {
                throw new AppError(
                  'User not exists or still not been verified',
                  StatusCodes.FORBIDDEN
                );
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
          return ToDosRepo.getToDoById(id)
            .then((todo) => {
              if (!todo) {
                return Promise.reject(
                  new AppError('Todo not found', StatusCodes.NOT_FOUND)
                );
              }
              const userId = req.session.userId;
              if (todo.user_id !== userId) {
                return Promise.reject(
                  new AppError(
                    'User has no right to edit this todo',
                    StatusCodes.FORBIDDEN
                  )
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
