const UserRepo = require('../user/repo');
const { PasswordUtils, TokenUtils, EmailUtils } = require('../utils');

const EMAIL_CONFIRMATION_PURPOSE = 'EMAIL_CONFIRMATION';
const PASSWORD_RESET_PURPOSE = 'PASSWORD_RESET';

const login = async (req) => {
  const { email, password } = req.body;
  const user = await UserRepo.getUserByEmail(email);
  if (!user) throw Error('User not found');
  if (await PasswordUtils.compare(password, user.password)) return user;
  throw Error('password not match');
};
const signup = async (req) => {
  const { name, password, email } = req.body;
  // encrypt password
  const hashedPw = await PasswordUtils.hash(password);
  // save on db
  const newUserId = await UserRepo.registerNewAccount(email, name, hashedPw);
  // create token
  const token = await createVerificationToken(newUserId);
  // send email
  await EmailUtils.sendVerification(email, token);
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

module.exports = {
  login,
  signup,
  isExistsEmail,
  createVerificationToken,
  createPasswordResetToken,
};
