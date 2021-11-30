const config = {};

config.redisStore = {
  host: process.env.REDIS_STORE_HOST,
  secret: process.env.REDIS_STORE_SECRET,
  port: process.env.REDIS_STORE_PORT,
};
config.databaseConnectionString = process.env.DB_CONNECTION_STRING;

config.email = {
  from: process.env.EMAIL_FROM,
  user: 'xnjjb5n6rntwvr3c@ethereal.email',
  pass: 'xeVJTFzFsnsN5WBe7N',
};

module.exports = config;
