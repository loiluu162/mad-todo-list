const config = {};

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET,
};
config.databaseConnectionString = process.env.DB_CONNECTION_STRING;
module.exports = config;
