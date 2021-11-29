const LoginService = require('./loginService');

exports.login = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await LoginService.login(username, password);
      req.session.loggedIn = true;
      req.session.username = user.email;
      // req.session.email = user.email;
      req.session.photoUrl = user.photoUrl;
      res.redirect('/profile');
    }
    throw Error('missing field email or password');
  } catch (e) {
    next(e);
  }
};
exports.signup = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      await LoginService.signup(email, name, password);
      return res.status(200).json({
        message: 'OK',
      });
    }
    throw Error('missing field email or password or full name');
  } catch (e) {
    next(e);
  }
};
