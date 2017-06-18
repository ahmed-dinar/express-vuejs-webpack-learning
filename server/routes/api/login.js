
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var uniqid = require('uniqid');
var config = require('../../config');
var fakeData = require('../../config/fake');


module.exports = function(req, res, next) {

  console.log(req.headers);
  console.log(req.body);

  var users = fakeData.users();

  var username = req.body.username;
  var password = req.body.password;

  var userData = _.find(users, _.matchesProperty('username', username));

  console.log(userData);

  if( !userData || userData.password != password )
    return res.status(200).json({ status: 'failed', error: 'Username or Password is invalid' });

  var payLoad = _.omit(userData, ['password','phone']);

  var jwtOpt = {
    algorithm: 'HS256',
    expiresIn: '24h',
    issuer: 'https://justoj.com/api/v1/',
    jwtid: uniqid(),
    subject: 'Auth',
    header: {
      typ: 'JWT'
    }
  };

  console.log(payLoad);
  console.log(jwtOpt);
  console.log(config.jwtSecret);

  jwt.sign(payLoad, config.jwtSecret, jwtOpt, function(err, token) {

    if(err){
      console.log(err);
      return res.status(500).json({ status: 'failed', error: 'Internal Server Error' });
    }

    console.log('token');
    console.log(token);

    payLoad.access_token = token;

    res.status(200).json({ status: 'success', data: payLoad });
  });


};
