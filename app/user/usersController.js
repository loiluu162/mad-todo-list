const UserService = require('./usersService');

exports.getUsers = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  console.log(req);
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
