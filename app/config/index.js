const config = {};

config.redisStore = {
  host: process.env.REDIS_STORE_HOST,
  secret: process.env.REDIS_STORE_SECRET,
  port: process.env.REDIS_STORE_PORT,
};
config.databaseConnectionString = process.env.DB_CONNECTION_STRING;

config.email = {
  from: process.env.EMAIL_FROM,
  user: process.env.EMAIL_USERNAME,
  pass: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST_PROVIDER,
};

module.exports = config;
