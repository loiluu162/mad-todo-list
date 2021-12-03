const { validationResult } = require('express-validator');

module.exports = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join('\n')
    );
  }
};
