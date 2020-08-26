require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const User = require('./models/user');
const methodOverride = require('method-override');
// const seedPosts = require('./seeds');
// seedPosts();

//require routes
const index = require('./routes/index');
const reviews = require('./routes/reviews');
const posts = require('./routes/posts');


const app = express();
//mongoose connection
mongoose.connect('mongodb://localhost:27017/surf-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Config passport and session
app.use(session({
  secret: 'beautifool',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware
app.use((req, res, next) => {
  //default user
  req.user = {
    '_id': '5f43e23daea9161ffcb6130b',
    // '_id':'5f4410ca2e666615f0f89217',
    'username': 'dee',
  };
  res.locals.currentUser = req.user;
  // set default title 
  res.locals.title = 'Surf Shop';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  //set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
});

// routes mount
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

module.exports = app;