require('./cronjobs');
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const { redisStore } = require('./config');
const { DEFAULT_MAX_AGE_SESSION } = require('./constants');
const RedisStore = require('connect-redis')(session);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
const configSessionDev = () => {
  const redisClient = redis.createClient({
    host: redisStore.host,
    port: redisStore.port,
    password: redisStore.password,
  });
  redisClient.on('error', function (error) {
    console.error(error);
  });

  // redisClient.set('key', 'value', redis.print);
  // redisClient.get('key', redis.print);
  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      secret: redisStore.secret,
      resave: false,
      cookie: {
        maxAge: process.env.SESSION_MAX_AGE || DEFAULT_MAX_AGE_SESSION,
      },
    })
  );
};
const configSessionProd = () => {
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: process.env.SESSION_MAX_AGE || DEFAULT_MAX_AGE_SESSION,
      },
    })
  );
};
process.env.NODE_ENV === 'dev' ? configSessionDev() : configSessionProd();
app.use('/static', express.static(path.join(__dirname, '/public')));

app.engine(
  '.hbs',
  engine({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname),
    partialsDir: path.join(__dirname),
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname));

//

app.use('/api/users', require('./restapi/user'));
app.use('/api/todos', require('./restapi/todos'));
app.use('/api/auth', require('./restapi/login'));
app.use('/api/storage', require('./restapi/storage'));
app.use('/', require('./web'));

module.exports = app;
