const pg = require('pg');
const Pool = pg.Pool;

const config = require('../../config/index');
const connectionString = config.databaseConnectionString;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', (client) => {
  console.log('INFO: Database connected');
});
pool.on('error', (client) => {
  console.log('ERROR: Database not connected');
});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
