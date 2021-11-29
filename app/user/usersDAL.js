const db = require('../db');

exports.getUsers = async (page, limit) => {
  console.log(page, limit);
  const offset = limit * page - limit;
  return (
    await db.query('SELECT * FROM users ORDER BY id ASC limit $1 offset $2', [
      limit,
      offset,
    ])
  ).rows;
};
