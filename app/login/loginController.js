const { StatusCodes } = require('http-status-codes');
const LoginService = require('./loginService');
const { validationResult } = require('express-validator');
exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await LoginService.login(email, password);
    req.session.loggedIn = true;
    req.session.email = user.email;
    req.session.userId = user.id;
    // req.session.email = user.email;
    req.session.photoUrl = user.photoUrl;
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Successfully logged in',
    });
  } catch (e) {
    next(e);
  }
};
exports.signup = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: StatusCodes.BAD_REQUEST, errors: errors.array() });
    }
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) throw Error('confirm password not match');

    if (await LoginService.isExistsEmail(email)) throw Error('account existed');

    if (name && email && password && confirmPassword) {
      await LoginService.signup(email, name, password);
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'Successfully signed up',
      });
    } else throw Error('missed field email or password or fullName');
  } catch (e) {
    next(e);
  }
};

exports.logout = async function (req, res) {
  req.session.destroy((_) => {
    res.redirect('/login');
  });
};
exports.forgotPassword = async function (req, res, next) {
  req.session.destroy((_) => {
    res.redirect('/login');
  });
};
