const db = require('../db');

exports.removeExpiredToken = async () => {
  return await db.query('DELETE tokens WHERE expires_at < CURRENT_TIMESTAMP');
};
