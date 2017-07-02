/**
 * Author: Ahmed Dinar
 * @type module
 */

var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var async = require('async');

var config = require('../../config');
var User = require('../../models/user');


module.exports = function(req, res, next) {

  console.log(req.body);

  var username = req.body.username;
  var password = req.body.password;

  async.waterfall([
    function(callback){

      User
        .query(function(qb) {
          qb.where('username', username).limit(1);
        })
        .fetch({ require: true })
        .then(function(model){
          callback(null, model);
        })
        .catch(User.NotFoundError, function(){
          callback('username or password is invalid');
        })
        .catch(function(err){
          callback(err);
        });

    },
    function(model, callback){

      bcrypt.compare(password, model.get('password'), function(err, res) {

        if(err)
          return callback(err);

        if(!res)
          return callback('username or password is invalid');

        callback(null, model);
      });

    },
    function (model, callback) {

      var payLoad = {
        name: model.get('name'),
        username: model.get('username'),
        email: model.get('email'),
        role: model.get('role')
      };

      jwt.sign(payLoad, config.jwtSecret, config.jwtOptions(), function(err, token) {

        if(err)
          return callback(err);

        payLoad.access_token = token;

        callback(null, payLoad);
      });
    }
  ], function(err, payLoad){

    if( err ){

      console.log(err);

      if( _.isString(err) )
        return res.status(401).json({ error: err });

      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json(payLoad);
  });

};
