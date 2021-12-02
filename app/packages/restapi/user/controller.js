import UserService from './service.js';

const getUsers = async function (req, res, next) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  try {
    const users = await UserService.getUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: users,
      message: 'Successfully users retrieved',
    });
  } catch (e) {
    next(e);
  }
};

export default { getUsers };
