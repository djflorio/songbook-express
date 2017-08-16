var Song = require('../models/song');

var async = require('async');

// Display list of all Songs
exports.song_list = function(req, res, next) {
    Song.find({}, 'title artist id')
        .populate('user')
        .exec(function (err, song_list) {
            if (err) { return next(err); }
            res.render('songs', { song_list: song_list });
        });
}

// Display Song
exports.song_detail = function(req, res) {
    res.render('song', { id: req.params.id });
    //res.send('NOT IMPLEMENTED: Song detail: ' + req.params.id);
}