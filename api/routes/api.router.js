var Song = require('../models/songs.model');
var Artist = require('../models/artist.model');
var express = require('express');
var router = express.Router();
// Api Routes
  /* Middle ware */
router 
  .use(function(req, res, next) {
    console.log('Something is happening.');
    next();
  });
  /* /song/:song_id */
router
  .route('/song/:song_id')
    .get(function(req, res) {
      Song.findById(req.params.song_id, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    })
    .put(function(req, res) {
      Song.findById(req.params.song_id, function(err, song) {
        if (err) res.send(err);
        song.name = req.body.name;
        song.save(function(err) {
          if (err) res.send(err);
          res.json({ message: 'Song updated!' });
        });
      });
    })
    .delete(function(req, res) {
      Song.remove({
        _id: req.params.song_id
      }, function(err, song) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
      });
    });
  /* Album */
router
  .route('/album/:album_name')
    .get(function(req, res) {
      Song.find({ album: req.params.album_name}, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    });
  /* Artist */
router
  .route('/artist/:artist')
    .get(function(req, res) {
      Artist.find({name: req.params.artist}, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    });
router
  .route('/artist/:artist/songs')
    .get(function(req, res) {
      Song.find({artist: req.params.artist}, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    });
router  
  .route('/artists/random/:number')
    .get(function(req,res){
      Artist.findRandom({}, {}, {limit: req.params.number}, function(err, data) {
        if (err) console.log(err);
        res.json(data);
      });
    });
router  
  .route('/artists/:limit/:page')
    .get(function(req, res) {
      var limit = req.params.limit;
      var page = req.params.page;
      Artist.find(function(err,data){
        limit = limit ? limit : data.length;
        var begin = parseInt(limit) * (parseInt(page) - 1);
        var numPages = Math.floor(data.length / parseInt(limit)) + ((data.length / parseInt(limit)) > Math.floor(data.length / parseInt(limit)) ? 1 : 0);
        var pageInfo = page + "/" + numPages;
        if (parseInt(page) > numPages || parseInt(page) == 0) {
          res.json({"result": "error", "data": {"error": "Page doesn't exist"}});
        }
        else {
          res.json({"data": data.slice(begin, begin + parseInt(limit)), "page": page, "pageTotal": numPages, "pageInfo": pageInfo});
        }
      });
    });
router  
  .route('/artists')
    .get(function(req, res) {
      Artist.find(function(err, artists) {
        if (err) res.send(err);
        res.json(artists);
      });
    });


  /* Author */
router
  .route('/author/:author')
    .get(function(req, res) {
      Song.find({author: req.params.author}, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    });
  /* Country */
router
  .route('/country/:country')
    .get(function(req, res) {
      Song.find({country: req.params.country}, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    });
  /* Year */
router
  .route('/year/:year')
    .get(function(req, res) {
      Song.find({year: req.params.year}, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    });
  /* Genre */
router
  .route('/genre/:genre')
    .get(function(req, res) {
      Song.find({genre: req.params.genre}, function(err, song) {
        if (err) res.send(err);
        res.json(song);
      });
    });
  /* /songs */
router
  .route('/songs/random/:number')
    .get(function(req,res){
      Song.findRandom({}, {}, {limit: req.params.number}, function(err, data) {
        if (err) console.log(err);
        res.json(data);
      });
    });
router  
  .route('/songs/:limit/:page')
    .get(function(req, res) {
      var limit = req.params.limit;
      var page = req.params.page;
      Song.find({},null, {sort: {'_id': -1}},function(err,data){
        limit = limit ? limit : data.length;
        var begin = parseInt(limit) * (parseInt(page) - 1);
        var numPages = Math.floor(data.length / parseInt(limit)) + ((data.length / parseInt(limit)) > Math.floor(data.length / parseInt(limit)) ? 1 : 0);
        var pageInfo = page + "/" + numPages;
        if (parseInt(page) > numPages || parseInt(page) == 0) {
          res.json({"result": "error", "data": {"error": "Page doesn't exist"}});
        }
        else {
          res.json({"data": data.slice(begin, begin + parseInt(limit)), "page": page, "pageTotal": numPages, "pageInfo": pageInfo});
        }
      });
    });
router
  .route('/songs')
    .post(function(req, res) {
      var song = new Song();     
      song.name = req.body.name; 
      song.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Song created!'});
      });   
    })
    .get(function(req, res) {
      Song.find(function(err, songs) {
        if (err) res.send(err);
        res.json(songs);
      });
    });
  /* Generic Root */
router
  .get('/', function(req, res) {
    res.json({ message: 'Api running FTW' });   
  });

module.exports = router;