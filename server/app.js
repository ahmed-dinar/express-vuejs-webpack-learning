var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
//var csrf = require('csurf');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var app = express();

app.use(cors());
app.use(helmet());
//app.use(csrf());
app.use(helmet.hidePoweredBy());

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/static')));


app.use('/api', require('./routes/api'));

app.get('*', function(req, res)  {
	res.sendFile(__dirname + '/public/index.html');
});




module.exports = app;
