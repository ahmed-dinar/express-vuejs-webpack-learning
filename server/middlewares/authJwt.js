
var jwt = require('express-jwt');
var config = require('../config');

module.exports = function(){

  return jwt({ secret: config.jwtSecret, issuer: 'https://somedmain.com/api/' });

};