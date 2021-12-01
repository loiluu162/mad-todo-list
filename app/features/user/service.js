const UsersDAL = require('./repo');

exports.getUsers = async function (query, page, limit) {
  try {
    // var users = await User.find(query);
    return await UsersDAL.getUsers(page, limit);
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
exports.isExistsUserId = async function (id) {
  return await UsersDAL.isExistsUserId(id);
};
