var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var sb_env = require("./env");

var app = express();

// set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://' + sb_env.mongo_user + ':' + sb_env.mongo_pass + '@ds139428.mlab.com:39428/sb';

console.log(mongoDB);

mongoose.connect(mongoDB, function(err) {
  if (err) throw err;
  console.log("succesfully connected to MongoDB");
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/* DB interaction examples

var User = require('./models/user');
var testUser = new User({
  username: 'djflorio',
  email: 'djflo404@gmail.com',
  password: ''
});

testUser.save(function(err) {
  if (err) throw err;
  console.log("user saved");
});

User.findOne({ username: 'djflorio' }, function(err, user) {
  if (err) throw err;

  user.comparePassword('', function(err, isMatch) {
    if (err) throw err;
    console.log('', isMatch);
  });
  user.comparePassword('', function(err, isMatch) {
    if (err) throw err;
    console.log('', isMatch);
  });
});

*/