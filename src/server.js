'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const middlewares = require('./server/middlewares');
const routes = require('./server/routes');
const config = require('./config').getConfig();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());

var pgSession = require('connect-pg-simple')(session);

let sess = {
  key: 'user_sid',
  store: new pgSession({
    conString: config.db.url
  }),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 10 * 60 * 100000
  }
};

app.use(session(sess));

app.use('/', routes);

app.use(middlewares.sessionChecker)

const port = process.env.PORT || 3000;

app.listen(config.server.port, () => {
  console.log(`listening on localhost://${config.server.port}`);
});

module.exports = app;