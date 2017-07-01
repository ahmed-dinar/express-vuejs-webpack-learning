var express = require('express');
var router = express.Router();

var _ = require('lodash');
var has = require('has');
var async = require('async');
var reCAPTCHA = require('recaptcha2');

var fakeData = require('../../config/fake');
var config = require('../../config');
var Schema = require('../../config/validation-schema');


router.post('/signup',function(req, res, next) {

  var credentials = req.body;
  console.log(credentials);

  async.waterfall([
    function(callback) {

      console.log(config.secrets.reCAPTCHA);

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
      req.assert('confirmPassword', 'Password does not match').equals(req.body.password);
      req.getValidationResult().then(function(result) {

        if (!result.isEmpty()){
          var e = result.array()[0];
          return callback(e.param + ' ' + e.msg);
        }

        return callback();
      });
    }
    ], function (err, result) {

      if(err){

        console.log(err);

        if( _.isString(err) )
          return res.status(200).json({ status: 'failed', error: err });

        return res.status(500).json('Internal server error');
      }

      res.sendStatus(401);

    });

});


router.post('/available',function(req, res, next) {

  if( !has(req.body, 'cred') )
    return res.sendStatus(400);

  var cred = req.body.cred;
  var users = fakeData.users();

  if( _.find(users, _.matchesProperty('username', cred)) || _.find(users, _.matchesProperty('email', cred)) )
    return res.status(200).json({ valid: false });

  res.status(200).json({ valid: true });
});


module.exports = router;