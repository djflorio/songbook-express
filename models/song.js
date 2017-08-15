var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChunkSchema = new Schema({
    chord: String,
    word: String
});

var LineSchema = new Schema({
    chunks: [ChunkSchema]
});

var SectionSchema = new Schema({
    lines: [LineSchema]
});

var SongSchema = new Schema({
    title: {type: String, required: true, max: 250},
    artist: {type: String, required: true, max: 150},
    keywords: [String],
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    sections: [{ lines: [{ chunks: [{ chord: String, word: String }] }] }]
});

SongSchema.virtual('url').get(function () {
    return '/song/' + this._id;
});

module.exports = mongoose.model('Song', SongSchema);