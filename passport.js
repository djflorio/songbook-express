var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var async = require('async');

module.exports = function(passport) {
    // Passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Local signup
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            async.series({
                matchEmail: function(callback) {
                    var match = false;
                    User.findOne( { 'email' : email }, function(err, user) {
                        if (err) { return done(err) }
                        if (user) {
                            match = true;
                        }
                        callback(null, match);
                    });
                },
                matchUsername: function(callback) {
                    var match = false;
                    User.findOne( { 'username' : req.param('username') }, function(err, user) {
                        if (err) { return done(err) }
                        if (user) {
                            match = true;
                        }
                        callback(null, match);
                    });
                },
                matchPasswords: function(callback) {
                    var match = false;
                    if (req.param('password') == req.param('password2')) {
                        match = true;
                    }
                    callback(null, match);
                }
            },
            function(err, results) {
                var message = [];
                if (results.matchEmail) {
                    message.push("An account with that email already exists");
                }
                if (results.matchUsername) {
                    message.push("An account with that username already exists");
                }
                if (!results.matchPasswords){
                    message.push("Passwords do not match");
                }
                if (message.length > 0) {
                    return done(null, false, req.flash('signupMessage', message));
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = password;
                    newUser.username = req.param('username');
                    newUser.save(function(err) {
                        if (err) { throw err; }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
}