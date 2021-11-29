require('./cronjobs');
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const redis = require('redis');

const RedisStore = require('connect-redis')(session);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: 'my-secret',
//     cookie: { maxAge: 60000 },
//   })
// );

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
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
    secret: 'my-super-secret',
    resave: false,
    saveUninitialized: false,
  })
);
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

app.use('/api/users', require('./user'));
app.use('/api/todos', require('./todos'));
app.use('/api/auth', require('./login'));
app.use('/', require('./web'));

module.exports = app;
