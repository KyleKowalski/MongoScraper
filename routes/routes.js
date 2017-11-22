var express = require('express');
var router = express.Router();
const scraper = require('../services/scraper');
const db = require('../models/');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.RedditArticle.find({}).sort({dateAdded: 1})
  .then(function(data){
    res.render('index', { redditArticle: data, title: 'Express',  });
  });
});

router.get('/scrapeNow', function(req, res){
  console.log(`firing scraper`);
  scraper();
});

router.get('/deleteAll', function(req, res){
  console.log(`deleting all`);
  // clean it out so we can start again
  db.RedditArticle.collection.drop()
  .then(function(){
    res.redirect('/');
  });
});

router.put('/addNote/:id', function(req, res){
  console.log(`adding note to id: ${id}`)
});

router.delete('/removeArticle/:id', function(req, res){
  console.log(`removing article id: ${req.params.id}`);

  db.RedditArticle.findByIdAndRemove(req.params.id)
  .then(function(){
    res.json("success");
  });
});

module.exports = router;