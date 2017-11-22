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
  db.Note.collection.drop()
  .then(function(){
    res.json("notes deleted - now for articles");
  });

  db.RedditArticle.collection.drop()
  .then(function(){
    res.json("articles deleted - now for a refresh");
    // might need to location redirect here.
  });
  
});

router.post('/addNote/:id', function(req, res){
  console.log(`adding note to id: ${req.params.id} - note is: '${req.body.thisNote}'`);
  db.Note
  .create({ noteText: req.body.thisNote })
  .then(function(dbNote) {
    console.log(`we just created this note: `);
    console.log(dbNote);
    console.log(`we are updating this article id: '${req.params.id}'`);
    db.redditArticle.findOneAndUpdate(
      { _id: req.params.id }, 
      { $push: { notes: dbNote._id } }, 
      { new: true });
  })
  .then(function(dbRedditArticle) {
    console.log(`We're in reddit article after note`);
    console.log(dbRedditArticle);
    // If the User was updated successfully, send it back to the client
    res.json(dbRedditArticle);
  })
  .catch(function(err) {
    console.log(`something blew up - we're not in reddit article anymore`);
    // If an error occurs, send it back to the client
    res.json(err);
  });
});

router.delete('/removeArticle/:id', function(req, res){
  console.log(`removing article id: ${req.params.id}`);

  db.RedditArticle.findByIdAndRemove(req.params.id)
  .then(function(){
    res.json("success");
  });
});

module.exports = router;