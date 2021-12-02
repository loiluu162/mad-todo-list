import dotenv from 'dotenv';

process.env.NODE_ENV === 'dev'
  ? dotenv.config({ path: '.env.dev' })
  : dotenv.config({ path: '.env.prod' });

export const redisStore = {
  host: process.env.REDIS_STORE_HOST,
  secret: process.env.REDIS_STORE_SECRET,
  port: process.env.REDIS_STORE_PORT,
};
export const databaseConnectionString = process.env.DB_CONNECTION_STRING;

export const emailService = {
  from: process.env.EMAIL_FROM,
  user: process.env.EMAIL_USERNAME,
  pass: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST_PROVIDER,
};
export const session = {
  secret: process.env.SESSION_SECRET,
};

// console.log(process.env);

export default { redisStore, databaseConnectionString, emailService };
