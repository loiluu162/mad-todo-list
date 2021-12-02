import UsersRepo from './repo.js';

const getUsers = async function (query, page, limit) {
  try {
    // var users = await User.find(query);
    return await UsersRepo.getUsers(page, limit);
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};

const isExistsUserId = async function (id) {
  return await UsersRepo.isExistsUserId(id);
};

export default { getUsers, isExistsUserId };
