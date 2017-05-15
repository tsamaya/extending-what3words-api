// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express

// rotating accesslog files
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
//
var logDirectory = path.join(__dirname, 'logs');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// now creates application log file
var logger = require('./lib/log.js');

// create a rotating write stream for access log file
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});
// setup the access log middleware
app.use(morgan('combined', {
  stream: accessLogStream
}));

// Error-handling middleware
app.use(function (err, req, res, next) {
  logger.log('error', err.stack);
  res.status(500).send('Something went horribly wrong!');
});

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  res.send('what3words API extension alive!');
});

var apiExtended = require('./lib/api');
var router = apiExtended.createApiRoutes();

// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
// Get port from environment and store in Express
var port = process.env.PORT || 3000;
app.listen(port);
logger.log('info', 'Server is listening on port', port);

module.exports = app; // for testing
