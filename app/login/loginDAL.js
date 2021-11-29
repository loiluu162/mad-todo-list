const db = require('../db');

exports.getUserByEmail = async (email) => {
  const result = (
    await db.query('SELECT * FROM users where email = $1', [email])
  ).rows;

  return result.length ? result[0] : null;
};
exports.registerNewAccount = async (email, name, password) => {
  return await db.query(
    'INSERT INTO users(email, name, password) values($1, $2, $3)',
    [email, name, password]
  );
};

exports.isExistsEmail = async (email) => {
  return (
    (await db.query('SELECT * FROM users where email = $1', [email])).rows
      .length > 0
  );
};
