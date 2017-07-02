
var ORM = require('../config/database/orm');
ORM.plugin('registry');

var User = ORM.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});


module.exports = ORM.model('User', User);