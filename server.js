var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dsong');

var Song = require('./api/models/songs.model.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/app/public')); 
console.log(__dirname + '/app/public');
var port = process.env.PORT || 4443; 

var api = require('./api/routes/api.router.js');
app.use('/api', api);
app.use('/api/*', api);

app.get('*', function(req, res) {
  res.sendfile('./app/public/index.html');
});

app.listen(port);
console.log('Listening at ' + port);
