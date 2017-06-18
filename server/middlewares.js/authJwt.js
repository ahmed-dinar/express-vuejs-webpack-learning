
var jwt = require('jsonwebtoken');
var has = require('has');
var config = require('../config');

module.exports = function(req, res, next){

  if( !has(req,'headers') || !has(req.headers,'authorization') ){
	return res.status(401).json({
		status: 'failed',
        error: "No token found!"
    });
  }

  var token = req.headers.authorization;

  jwt.verify(token, config.jwtSecret, function(err, decoded) {

  	  console.log(decoded);

  	  if( err ){
  	  	console.log(err);
  	  	return res.status(401).json({
  	  		status: 'failed',
	        error: "Invalid Token?"
   		});
  	  }

  	  req.user = decoded;
  	  next();
  });

};