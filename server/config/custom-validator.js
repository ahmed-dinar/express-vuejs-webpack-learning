/**
 * Author: Ahmed Dinar
 * 01/07/2017
 *
 * Custom validation object for express-validator
 * https://github.com/ctavan/express-validator#customvalidators
 */

var User = require('../models/user');
var Promise = require('bluebird');


/**
 * Check if a user already exists within a username or password
 * @param  {[type]}  [description]
 * @return {[type]}  [description]
 */
function userExists(userData){

  return new Promise(function(resolve, reject){

    User
    .query(function(qb) {
      qb.where('username', userData).orWhere('email', userData).limit(1);
    })
    .fetch({ require: true })
    .then(function(model){
      reject();
    })
    .catch(User.NotFoundError, function(){
      resolve();
    })
    .catch(function(err){
      console.log(err);
      throw err;
    });
  });
}


module.exports = {
  userExists: userExists
};