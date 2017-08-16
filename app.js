var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var songs = require('./routes/songs');

var sb_env = require("./env");

// set up db connection
var mongoDB = 'mongodb://' + sb_env.mongo_user + ':' + sb_env.mongo_pass + '@ds139428.mlab.com:39428/sb';
mongoose.connect(mongoDB, function(err) {
  if (err) throw err;
  console.log("succesfully connected to MongoDB");
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./passport')(passport);

// general options
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set up passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// set up routes
app.use('/', index);
app.use('/users', users);
app.use('/songs', songs);

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