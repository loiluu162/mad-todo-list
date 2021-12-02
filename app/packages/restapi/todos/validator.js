import { body } from 'express-validator';
import ToDosService from './service.js';
import UsersService from '../user/service.js';

const validate = (method) => {
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
              console.log(existed);
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

export default validate;
