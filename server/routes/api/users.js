var express = require('express');
var router = express.Router();

var _ = require('lodash');
var has = require('has');
var async = require('async');
var reCAPTCHA = require('recaptcha2');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var fakeData = require('../../config/fake');
var config = require('../../config');
var Schema = require('../../config/validation-schema');
var User = require('../../models/user');


router.post('/signup',function(req, res, next) {

  var credentials = req.body;
  console.log(credentials);

  async.waterfall([
    function(callback) {

      var recaptcha = new reCAPTCHA({
        siteKey: config.secrets.reCAPTCHA.site_key,
        secretKey: config.secrets.reCAPTCHA.secret_key
      });

      recaptcha.validateRequest(req)
      .then(function(){
        callback();
      })
      .catch(function(errorCodes){
        console.log(recaptcha.translateErrors(errorCodes));
        callback('Captcha does not match');
      });
    },
    function(callback){

      req.checkBody(Schema.signup);
      req.checkBody('username','already taken').userExists();
      req.checkBody('email','already taken').userExists();
      req.assert('confirmPassword', 'does not match').equals(req.body.password);

      req.getValidationResult().then(function(result) {

        if (!result.isEmpty()){
         // console.log(result.array());
         var e = result.array()[0];
         return callback(e.param + ' ' + e.msg);
       }

       return callback();
     });
    },
    function(callback) {
      bcrypt.genSalt(10, callback);
    },
    function(salt,callback) {
      bcrypt.hash(req.body.password, salt, callback);
    },
    function(hashedPassword, callback){

      var data = {
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        role: 'user',
      };

      User
      .forge(null, { hasTimestamps: false })
      .save(data, { require: true })
      .then(function(model){
        console.log(model.attributes);
        callback(null,model.attributes);
      })
      .catch(User.NoRowsUpdatedError, function(){
        callback(new Error('database error'));
      })
      .catch(function(err){
        callback(err);
      });

    },
    function(userData, callback){

      var payLoad = _.omit(userData,['password','id']);

      jwt.sign(payLoad, config.jwtSecret, config.jwtOptions(), function(err, token) {

        if(err)
          return callback(err);

        payLoad.access_token = token;

        return callback(null,payLoad);
      });

    }
  ], function (err, payLoad) {

      if(err){

        console.log(err);

        if( _.isString(err) )
          return res.status(200).json({ status: 'failed', error: err });

        return res.status(500).json('Internal server error');
      }

      console.log(payLoad);

      res.status(200).json({ status: 'success', payLoad: payLoad });
    });

});


/**
 * check if a user exists
 */
router.post('/available',function(req, res, next) {

  console.log(req.body);

  if( !has(req.body, 'cred') )
    return res.sendStatus(400);

  var cred = req.body.cred;

  User
  .query(function(qb) {
    qb.where('username', cred).orWhere('email', cred).limit(1);
  })
  .fetch({ require: true })
  .then(function(model){
    return res.status(200).json({ valid: false });
  })
  .catch(User.NotFoundError, function(){
    return res.status(200).json({ valid: true });
  })
  .catch(function(err){
    console.log(err);
    return res.sendStatus(500);
  });

});


module.exports = router;