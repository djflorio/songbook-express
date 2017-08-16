var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  res.render('signup', { messages: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
      user : req.user // get the user out of session and pass to template
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;