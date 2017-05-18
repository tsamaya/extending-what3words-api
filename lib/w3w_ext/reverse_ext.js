var _ = require('lodash');
var logger = require('winston'); // application log file
var what3words = require('../what3words');
// var pHandler = require('./promise_handler');

/**
 * [description]
 * @param  {[type]} req             [description]
 * @param  {[type]} res             [description]
 * @param  {[type]} promiseThrottle [description]
 * @return {[type]}                 [description]
 */
module.exports = function (req, res, promiseThrottle) {
  var langs;
  if (!_.has(req.query, 'langs')) {
    logger.log('debug', 'langs not found');
    langs = ['en'];
  } else {
    langs = req.query.langs.split(',');
  }
  var promises = [];
  _.forEach(langs, function (lang) {
    var l = lang.trim();
    if (l.length === 2) {
      logger.log('debug', 'reverse with lang', l);
      var query = {
        lang: l,
        format: 'geojson',
        coords: req.query.coords
      };
      var p;
      if (typeof promiseThrottle === 'undefined') {
        p = what3words.reverse(query);
      } else {
        p = promiseThrottle.add(what3words.reverse.bind(this, query));
      }
      promises.push(p);
    } else {
      logger.log('warn', l, 'is not a valid ISO 3166-1 code');
    }
  });
  var result = null;
  Promise.all(promises).then(function (values) {
    // pHandler.logResponses(values);
    _.forEach(values, function (value) {
      var data = JSON.parse(value);
      var prop = 'words_' + data.properties.language;
      var words = data.properties.words;
      if (result === null) {
        result = _.merge({}, data);
      }
      result.properties[prop] = words;
    });
    // result.properties = _.remove(result.properties, 'map');
    // result.properties = _.remove(result.properties, 'words');
    // result.properties = _.remove(result.properties, 'language');
    res.send(result);
  });
};
