import db from '../../../db/index.js';

const getUsers = async (page, limit) => {
  const offset = limit * page - limit;
  return (
    await db.query('SELECT * FROM users ORDER BY id ASC limit $1 offset $2', [
      limit,
      offset,
    ])
  ).rows;
};

const isExistsUserId = async (id) => {
  console.log(id);
  return (
    (await db.query('SELECT * FROM users where id = $1 and enabled=TRUE', [id]))
      .rows.length > 0
  );
};

const getUserByEmail = async (email) => {
  const result = (
    await db.query('SELECT * FROM users where email = $1', [email])
  ).rows;

  return result.length ? result[0] : null;
};

const getUserById = async (id) => {
  const result = (await db.query('SELECT * FROM users where id = $1', [id]))
    .rows;

  return result.length ? result[0] : null;
};

const registerNewAccount = async (email, name, password) => {
  // return new Id
  return (
    await db.query(
      'INSERT INTO users(email, name, password) values($1, $2, $3) RETURNING id',
      [email, name, password]
    )
  ).rows[0].id;
};

const isExistsEmail = async (email) => {
  return (
    (await db.query('SELECT * FROM users where email = $1', [email])).rows
      .length > 0
  );
};

const createToken = async (userId, token, purpose) => {
  return (
    await db.query(
      "INSERT INTO tokens(token,user_id, purpose, created_at, expires_at) values($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '1 HOURS') RETURNING token",
      [token, userId, purpose]
    )
  ).rows[0].token;
};

const getValidToken = async (token, purpose) => {
  const result = (
    await db.query(
      'SELECT * FROM tokens WHERE token = $1 AND purpose=$2 AND expires_at > now() AND token_used_at IS NULL ORDER BY id DESC',
      [token, purpose]
    )
  ).rows;
  return result.length ? result[0] : null;
};

const verifyUser = async (userId) => {
  return (
    (
      await db.query('UPDATE users SET enabled=TRUE WHERE id=$1 RETURNING id', [
        userId,
      ])
    ).rows.length > 0
  );
};

const markTokenUsed = async (id) => {
  return (
    (
      await db.query(
        'UPDATE tokens SET token_used_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING id',
        [id]
      )
    ).rows.length > 0
  );
};

const resetPassword = async (userId, newHashedPassword) => {
  return (
    (
      await db.query('UPDATE users SET password=$1 WHERE id=$2 RETURNING id', [
        newHashedPassword,
        userId,
      ])
    ).rows.length > 0
  );
};

const isCurrentPasswordValid = async (userId, currentHashedPassword) => {
  return (
    (
      await db.query('SELECT * FROM users where id = $1 AND password= $2', [
        userId,
        currentHashedPassword,
      ])
    ).rows.length > 0
  );
};

export default {
  getUsers,
  isExistsUserId,
  getUserByEmail,
  getUserById,
  registerNewAccount,
  isExistsEmail,
  createToken,
  getValidToken,
  verifyUser,
  markTokenUsed,
  resetPassword,
  isCurrentPasswordValid,
};
