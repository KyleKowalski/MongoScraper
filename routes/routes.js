var express = require('express');
var router = express.Router();
const scraper = require('../services/scraper');
const VacationSpot = require('../models/vacationSpot');

/* GET home page. */
router.get('/', function(req, res, next) {
  VacationSpot.find({})
  .then(function(data){
    console.log(data);
    res.render('index', { vacationSpots: data, title: 'Express',  });
  });
});

router.get('/scrapeNow', function(req, res){
  console.log(`firing scraper`);
  scraper();
});

module.exports = router;