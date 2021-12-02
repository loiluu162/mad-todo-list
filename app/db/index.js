import pg from 'pg';
import { databaseConnectionString } from '../config/index.js';

console.log(databaseConnectionString);

const Pool = pg.Pool;

const pool = new Pool({
  connectionString: databaseConnectionString,
  // ssl: { rejectUnauthorized: false },
});

pool.on('connect', (client) => {
  console.log('INFO: Database connected');
});
pool.on('error', (client) => {
  console.log('ERROR: Database not connected');
});
export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
