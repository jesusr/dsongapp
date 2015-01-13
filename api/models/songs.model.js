var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SongSchema   = new Schema({
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
},{ collection : 'songs' });

module.exports = mongoose.model('Song', SongSchema);