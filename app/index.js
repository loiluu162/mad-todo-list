import {} from './cronjobs/index.js';
import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import redis from 'redis';
import { redisStore } from './config/index.js';
import connectRedis from 'connect-redis';
import restApiRouter from './packages/restapi/index.js';
import webRouter from './packages/web/index.js';
const RedisStore = connectRedis(session);

const __dirname = path.resolve();

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
      cookie: { maxAge: 2 * 60 * 60 * 1000 },
    })
  );
};
const configSessionProd = () => {
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'secret',
      // secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 2 * 60 * 60 * 1000 },
    })
  );
};
process.env.NODE_ENV === 'dev' ? configSessionDev() : configSessionProd();
app.use('/static', express.static(path.join(__dirname, '/app/public')));

app.engine(
  '.hbs',
  engine({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/app'),
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
app.set('views', path.join(__dirname, '/app'));

//

// app.use('/api/users', require('./features/user'));
// app.use('/api/todos', require('./features/todos'));
// app.use('/api/auth', require('./features/login'));
// app.use('/api/storage', require('./features/storage'));
// app.use('/', require('./views'));

app.use('/api', restApiRouter);
app.use('/', webRouter);

export default app;
