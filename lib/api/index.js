var express = require('express');
var PromiseThrottle = require('promise-throttle');
var logger = require('winston'); // application log file
var what3words = require('../what3words');
var pHandler = require('./promise_handler');
var reverse_ext = require('../w3w_ext/reverse_ext');
var autocomplete = require('../w3w_ext/autocomplete');

module.exports = {
  createApiRoutes: function () {
    // ROUTES FOR OUR API
    // =============================================================================
    var router = express.Router(); // get an instance of the express Router

    var promiseThrottle = new PromiseThrottle({
      requestsPerSecond: 10, // up to n requests per second
      promiseImplementation: Promise // the Promise library you are using
    });

    // middleware to use for all requests
    router.use(function (req, res, next) {
      // do logging
      logger.log('info', 'new API request');
      next(); // make sure we go to the next routes and don't stop here
    });

    // REGISTER OUR ROUTES -------------------------------
    router.route('/languages')
      .get(function (req, res) {
        logger.log('debug', '`languages` called.');
        var p = promiseThrottle.add(what3words.languages.bind(this, req.query));
        pHandler.sendPromiseResponse(p, res);
      });

    router.route('/reverse')
      .get(function (req, res) {
        logger.log('debug', '`reverse` called.');
        var p = promiseThrottle.add(what3words.reverse.bind(this, req.query));
        pHandler.sendPromiseResponse(p, res);
      });

    router.route('/reverse-ext')
      .get(function (req, res) {
        logger.log('debug', '`reverse extended` called.');
        reverse_ext(req, res, promiseThrottle);
      });

    router.route('/autocomplete')
      .get(function (req, res) {
        logger.log('debug', '`autocomplete` called.');
        autocomplete(req, res, promiseThrottle);
      });

    // returns the router
    return router;
  }
};
