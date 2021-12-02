import UserRepo from '../user/repo.js';
import { validationResult } from 'express-validator';
import { TokenUtils, EmailUtils } from '../../../utils/index.js';
import { compare, hash } from '../../../utils/password.js';
import {
  EMAIL_CONFIRMATION_PURPOSE,
  PASSWORD_RESET_PURPOSE,
} from '../../../constants/index.js';

const login = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  const { email, password } = req.body;
  const user = await UserRepo.getUserByEmail(email);
  if (!user) throw Error('User not found');
  if (!user.enabled) {
    throw Error('User not verified. Please check your email for confirmation');
  }
  if (compare(password, user.password)) {
    // req.session.loggedIn = true;
    // req.session.email = user.email;
    // req.session.userId = user.id;
    // req.session.photoUrl = user.photo_url;
    // req.session = {
    //   ...req.session,
    //   loggedIn: true,
    //   email: user.email,
    //   userId: user.id,
    //   photoUrl: user.photo_url,
    // };
    setUserAuthenticated(req, user);
    return user;
  }
  throw Error('Password wrong');
};

const signup = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  const { name, password, email } = req.body;
  // encrypt password
  const hashedPw = await hash(password);
  // save on db
  const newUserId = await UserRepo.registerNewAccount(email, name, hashedPw);
  // create token
  const token = await createVerificationToken(newUserId);
  // send email
  await EmailUtils.sendVerification(email, token);

  req.session.email = email;
  req.session.userId = newUserId;
};

const isExistsEmail = async (email) => {
  return await UserRepo.isExistsEmail(email);
};

const createVerificationToken = async (userId) => {
  const token = await TokenUtils.generate();
  return await UserRepo.createToken(userId, token, EMAIL_CONFIRMATION_PURPOSE);
};
const createPasswordResetToken = async (userId) => {
  const token = await TokenUtils.generate();
  return await UserRepo.createToken(userId, token, PASSWORD_RESET_PURPOSE);
};

const verifyEmail = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  const { code } = req.body;

  // eslint-disable-next-line camelcase
  const { user_id, id } = await UserRepo.getValidToken(
    code,
    EMAIL_CONFIRMATION_PURPOSE
  );
  const user = await UserRepo.getUserById(user_id);
  // req.session.loggedIn = true;
  // req.session.email = user.email;
  // req.session.userId = user.id;
  // req.session.photoUrl = user.photo_url;
  setUserAuthenticated(req, user);

  await UserRepo.verifyUser(user_id);
  return await UserRepo.markTokenUsed(id);
};

const verifyPasswordResetToken = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  return true;
};

const resetPassword = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  const { code, newPassword } = req.body;
  // hash password
  const hashedPw = hash(newPassword);
  // eslint-disable-next-line camelcase
  const { user_id, id } = await UserRepo.getValidToken(
    code,
    PASSWORD_RESET_PURPOSE
  );
  const user = await UserRepo.getUserById(user_id);
  // req.session.loggedIn = true;
  // req.session.email = user.email;
  // req.session.userId = user.id;
  // req.session.photoUrl = user.photo_url;
  setUserAuthenticated(req, user);

  // mark token used
  await UserRepo.markTokenUsed(id);

  // user not enabled
  if (!(await UserRepo.isExistsUserId(user_id))) {
    await UserRepo.verifyUser(user_id);
  }
  // change password
  return await UserRepo.resetPassword(user_id, hashedPw);
};

const requestForgotPassword = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  req.session.forgotPassword = true;
  const { email } = req.body;
  // eslint-disable-next-line camelcase
  const user = await UserRepo.getUserByEmail(email);
  const token = await createPasswordResetToken(user.id);
  return await EmailUtils.sendPasswordReset(email, token);
};

const changePassword = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
  const { newPassword } = req.body;
  const { userId } = req.session;

  const hashedNewPassword = hash(newPassword);

  return UserRepo.resetPassword(userId, hashedNewPassword);
};

const setUserAuthenticated = (req, user) => {
  req.session = {
    ...req.session,
    loggedIn: true,
    email: user.email,
    userId: user.id,
    photoUrl: user.photo_url,
  };
};

export default {
  login,
  signup,
  isExistsEmail,
  createVerificationToken,
  createPasswordResetToken,
  verifyEmail,
  resetPassword,
  verifyPasswordResetToken,
  requestForgotPassword,
  changePassword,
};
