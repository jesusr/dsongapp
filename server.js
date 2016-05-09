var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = process.env.PORT || 4443,
  api = require('./api/routes/api.router.js');
mongoose.connect('mongodb://localhost:27017/dsong');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/'));
app.use('/api', api);
app.use('/api/*', api);
app.get('*', function(req, res) {
  res.sendfile('./app/public/index.html');
});
app.listen(port);
console.log('Listening at ' + port);

