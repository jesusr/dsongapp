var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var SongSchema = new Schema({
    id: Number,
    date: Date,
    title: String,
    author: String,
    song: String,
    artist: String,
    album: String,
    genre: String,
    year: Number,
    country: String,
    podcast: String,
    web: String,
    audioplayer: String,
    videoplayer: String,
    spotify: String
}, {
    collection: 'songs'
});
SongSchema.plugin(random);

module.exports = mongoose.model('Song', SongSchema);

