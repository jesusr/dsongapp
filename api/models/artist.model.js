var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArtistSchema   = new Schema({
    name: String,
    country: String,
    web_url: String
},{ collection : 'artists' });

module.exports = mongoose.model('Artist', ArtistSchema);