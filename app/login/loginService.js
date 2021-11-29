const LoginDAL = require('./loginDAL');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (username, password) => {
  const user = await LoginDAL.getUserByEmail(username);
  if (!user) throw Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) return user;
  throw Error('password not match');
};
exports.signup = async (email, name, password) => {
  // encrypt password
  const hashedPw = await bcrypt.hash(password, saltRounds);

  // send email

  // save on db
  return await LoginDAL.registerNewAccount(email, name, hashedPw);
};

exports.isExistsEmail = async (email) => {
  return await LoginDAL.isExistsEmail(email);
};
