const Pool = require('pg').Pool;
// const connectionString = `postgresql://dbuser:secretpassword@database.server.com:3211/mydb`
const config = require('../../config/index');
const connectionString = config.databaseConnectionString;

const pool = new Pool({
  connectionString,
});

pool.on('connect', (client) => {
  console.log('connected');
});
pool.on('error', (client) => {
  console.log('not connected');
});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
