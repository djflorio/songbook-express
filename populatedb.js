console.log("populating DB...");

var async = require('async');
var Song = require('./models/song');
var User = require('./models/user');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://' + USERNAME + ':' + PASSWORD + '@ds139428.mlab.com:39428/sb';

mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var testUser;

User.findOne({ username: 'djflorio' }, function(err, user) {
  if (err) throw err;
  songCreate(user);
});

function songCreate(user) {
  var songdetail = {
    title: "Fuzzy",
    artist: "Isaac Tyson",
    keywords: ["cool", "scary", "fun", "skeptical"],
    user: user,
    sections: [
      {
          lines: [
              {
                  chunks: [
                      {
                          chord: "G",
                          word: "I"
                      },
                      {
                          chord: "Am",
                          word: "am"
                      },
                      {
                          chord: "F",
                          word: "cool"
                      }
                  ]
              },
              {
                  chunks: [
                      {
                          chord: "C",
                          word: "You"
                      },
                      {
                          chord: "",
                          word: "are"
                      },
                      {
                          chord: "",
                          word: "not"
                      }
                  ]
              }
          ]
      },
      {
          lines: [
              {
                  chunks: [
                      {
                          chord: "G",
                          word: "He"
                      },
                      {
                          chord: "Am",
                          word: "is"
                      },
                      {
                          chord: "F",
                          word: "really"
                      },
                      {
                          chord: "",
                          word: "cool"
                      }
                  ]
              },
              {
                  chunks: [
                      {
                          chord: "C",
                          word: "You"
                      },
                      {
                          chord: "",
                          word: "are"
                      },
                      {
                          chord: "",
                          word: "not"
                      }
                  ]
              }
          ]
      }
    ]
  }

  var song = new Song(songdetail);
  song.save(function(err) {
    if (err) throw err;
    console.log("song saved!");
  });
}


/* DB interaction examples

var User = require('./models/user');
var testUser = new User({
  username: 'djflorio',
  email: 'djflo404@gmail.com',
  password: 'password'
});

testUser.save(function(err) {
  if (err) throw err;
  console.log("user saved");
});

User.findOne({ username: 'djflorio' }, function(err, user) {
  if (err) throw err;

  user.comparePassword('password', function(err, isMatch) {
    if (err) throw err;
    console.log('password', isMatch);
  });
  user.comparePassword('password1', function(err, isMatch) {
    if (err) throw err;
    console.log('password1', isMatch);
  });
});

*/