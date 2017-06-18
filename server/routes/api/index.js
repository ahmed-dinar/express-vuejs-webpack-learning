var express = require('express');
var router = express.Router();

var fakeData = require('../../config/fake');


router.get('/members',function(req, res, next) {

  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.hostname);

  res.status(200).json( fakeData.members() );

});


router.get('/countries',function(req, res, next) {

  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.hostname);

  res.status(200).json( fakeData.countries() );

});


router.post('/login', require('./login') );

module.exports = router;