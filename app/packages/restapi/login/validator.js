import { body } from 'express-validator';
import UserRepo from '../user/repo.js';

import {
  EMAIL_CONFIRMATION_PURPOSE,
  PASSWORD_RESET_PURPOSE,
} from '../../../constants/index.js';

import { PasswordUtils } from '../../../utils/index.js';
const validate = (method) => {
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
    case 'verifyPasswordResetToken': {
      return [
        body('code').custom((code) => {
          return UserRepo.getValidToken(code, PASSWORD_RESET_PURPOSE).then(
            (token) => {
              if (!token) {
                return Promise.reject(
                  new Error(
                    'Password reset code was wrong or had been expired or used'
                  )
                );
              }
            }
          );
        }),
      ];
    }
    case 'verifyEmail': {
      return [
        body('code').custom((code) => {
          return UserRepo.getValidToken(code, EMAIL_CONFIRMATION_PURPOSE).then(
            (token) => {
              if (!token) {
                return Promise.reject(
                  new Error(
                    'Confirm code was wrong or had been expired or used'
                  )
                );
              }
            }
          );
        }),
      ];
    }
    case 'resetPassword': {
      return [
        body('newPassword').isLength({ min: 6 }),
        body('confirmNewPassword').custom((value, { req }) => {
          if (value !== req.body.newPassword) {
            throw new Error('Password confirmation does not match password');
          }
          return true;
        }),
        body('code').custom((code) => {
          return UserRepo.getValidToken(code, PASSWORD_RESET_PURPOSE).then(
            (token) => {
              if (!token) {
                return Promise.reject(
                  new Error('Password reset token had been expired or used')
                );
              }
            }
          );
        }),
      ];
    }
    case 'requestForgotPassword': {
      return [
        body('email', 'Invalid email').exists().isEmail().trim(),
        body('email').custom((email) => {
          return UserRepo.isExistsEmail(email).then((existed) => {
            if (!existed) {
              return Promise.reject(new Error('Email not existed in use'));
            }
          });
        }),
      ];
    }
    case 'changePassword': {
      return [
        body('oldPassword').isLength({ min: 6 }),
        body('oldPassword').custom((oldPassword, { req }) => {
          const { userId } = req.session;
          return UserRepo.getUserById(userId).then((user) => {
            if (!user) {
              return Promise.reject(new Error('User not found'));
            }
            if (!PasswordUtils.compare(oldPassword, user.password)) {
              throw new Error('Current password wrong');
            }
          });
        }),
        body('newPassword').custom((newPassword, { req }) => {
          if (newPassword === req.body.oldPassword) {
            throw new Error(
              'New password need to be different from current one'
            );
          }
          return true;
        }),
        body('confirmNewPassword').custom((value, { req }) => {
          if (value !== req.body.newPassword) {
            throw new Error(
              'New password confirmation does not match password'
            );
          }
          return true;
        }),
      ];
    }
  }
};

export default validate;
