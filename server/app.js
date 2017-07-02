var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var compression = require('compression');
var serveStatic = require('serve-static');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var helmet = require('helmet');
var customValidators = require('./config/custom-validator');

var app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(helmet.hidePoweredBy());

app.use(favicon(path.join(__dirname, 'public/static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(expressValidator({ customValidators: customValidators }));
app.use(serveStatic(path.join(__dirname, 'public/static')));

app.use('/api', require('./routes/api'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(function (err, req, res, next) {

  console.log(err);

  //express-jwt authentication
  if (err.name === 'UnauthorizedError')
    return res.status(401).json({ error: 'Unauthorized' });

  res.status(500).json({ error: 'Internal Server Rrror' });
});



module.exports = app;
