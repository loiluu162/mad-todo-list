const UserRepo = require('../user/repo');
const { validationResult } = require('express-validator');
const { PasswordUtils, TokenUtils, EmailUtils } = require('../utils');

const {
  EMAIL_CONFIRMATION_PURPOSE,
  PASSWORD_RESET_PURPOSE,
} = require('../constants');

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
  if (await PasswordUtils.compare(password, user.password)) {
    req.session.loggedIn = true;
    req.session.email = user.email;
    req.session.userId = user.id;
    req.session.photoUrl = user.photo_url;
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
  const hashedPw = await PasswordUtils.hash(password);
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
  req.session.loggedIn = true;
  req.session.email = user.email;
  req.session.userId = user.id;
  req.session.photoUrl = user.photo_url;
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
  const hashedPw = PasswordUtils.hash(newPassword);
  // eslint-disable-next-line camelcase
  const { user_id, id } = await UserRepo.getValidToken(
    code,
    PASSWORD_RESET_PURPOSE
  );
  const user = await UserRepo.getUserById(user_id);
  req.session.loggedIn = true;
  req.session.email = user.email;
  req.session.userId = user.id;
  req.session.photoUrl = user.photo_url;
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

  const hashedNewPassword = PasswordUtils.hash(newPassword);

  return UserRepo.resetPassword(userId, hashedNewPassword);
};
module.exports = {
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
