var express = require('express');
var router = express.Router();
const scraper = require('../services/scraper');
const db = require('../models/');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.RedditArticle.find({})
  .then(function(data){
    console.log(data);
    res.render('index', { redditArticle: data, title: 'Express',  });
  });
});

router.get('/scrapeNow', function(req, res){
  console.log(`firing scraper`);
  scraper();
});

module.exports = router;