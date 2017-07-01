var uniqid = require('uniqid');
var secret = require('./secret');

module.exports = {

  secrets: secret,

  jwtOptions: function(){

    return {
      algorithm: 'HS256',
      expiresIn: 60*60,
      issuer: 'https://somedmain.com/api/',
      jwtid: uniqid(),
      subject: 'Auth',
      header: {
        typ: 'JWT'
      }
    };
  },

  jwtSecret: 'bG2BbL7bxL8RezXjanerGNEyPBjYLUhEmy'

};