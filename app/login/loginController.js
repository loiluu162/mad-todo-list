const { StatusCodes } = require('http-status-codes');
const LoginService = require('./loginService');
const { body, validationResult } = require('express-validator');
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

exports.validate = (method) => {
  switch (method) {
    case 'signup': {
      return [
        body('name', 'User full name required ').exists().trim(),
        body('password').isLength({ min: 6 }),
        body('passwordConfirmation').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
          }
          return true;
        }),
        body('email', 'Invalid email').exists().isEmail().trim(),
        body('email').custom((email) => {
          return LoginService.isExistsEmail(email).then((existed) => {
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
          return LoginService.isExistsEmail(email).then((existed) => {
            if (!existed) {
              return Promise.reject(new Error('E-mail not existed in use'));
            }
          });
        }),
        body('password').isLength({ min: 6 }),
      ];
    }
  }
};
