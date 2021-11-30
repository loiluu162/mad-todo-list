const { body } = require('express-validator');
const UserRepo = require('../user/repo');
exports.validate = (method) => {
  switch (method) {
    case 'signup': {
      return [
        body('name', 'User full name required ').exists().trim(),
        body('password').isLength({ min: 6 }),
        body('confirmPassword').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
          }
          return true;
        }),
        body('email', 'Invalid email').exists().isEmail().trim(),
        body('email').custom((email) => {
          return UserRepo.isExistsEmail(email).then((existed) => {
            if (existed) {
              return Promise.reject(new Error('E-mail already in use'));
            }
          });
        }),
      ];
    }
    case 'login': {
      return [
        body('email', 'User email required ').exists(),
        body('email').custom((email) => {
          return UserRepo.isExistsEmail(email).then((existed) => {
            if (!existed) {
              return Promise.reject(new Error('E-mail not existed in use'));
            }
          });
        }),
        body('password').isLength({ min: 6 }),
      ];
    }
    case 'forgotPassword': {
      return [
        body('name', 'User full name required ').exists().trim(),
        body('password').isLength({ min: 6 }),
        body('confirmPassword').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
          }
          return true;
        }),
        body('email', 'Invalid email').exists().isEmail().trim(),
        body('email').custom((email) => {
          return UserRepo.isExistsEmail(email).then((existed) => {
            if (existed) {
              return Promise.reject(new Error('Email already in use'));
            }
          });
        }),
      ];
    }
  }
};
