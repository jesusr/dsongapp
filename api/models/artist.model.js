var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var ArtistSchema = new Schema({
    name: String,
    country: String,
    web_url: String
}, {
    collection: 'artists'
});
ArtistSchema.plugin(random);

module.exports = mongoose.model('Artist', ArtistSchema);

