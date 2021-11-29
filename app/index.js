require('./cronjobs');
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'my-secret',
    cookie: { maxAge: 60000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api/auth', require('./login'));
app.use('/', require('./web'));

module.exports = app;
