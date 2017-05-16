var _ = require('lodash');
var logger = require('winston'); // application log file
var what3words = require('../what3words');

/**
 * [description]
 * @param  {[type]} req             [description]
 * @param  {[type]} res             [description]
 * @param  {[type]} promiseThrottle [description]
 * @return {[type]}                 [description]
 */
module.exports = function (req, res, promiseThrottle) {
  var query = req.query;
  // var partial = false;
  if (typeof query.addr === 'undefined') {
    res.send({
      code: 400,
      message: 'missing required parameter \'addr\''
    });
  }
  var n = query.addr.split('.').length - 1;
  logger.log('debug', 'n dot is', n);
  var nstop = 2 - n;
  logger.log('debug', 'nstop to add', nstop);
  if (nstop === 2) {
    query.addr = query.addr + '.a.a';
  } else if (nstop === 1) {
    query.addr = query.addr + '.a';
  }
  var promises = [];
  var p;
  if (typeof promiseThrottle === 'undefined') {
    p = what3words.autosuggest(query);
  } else {
    p = promiseThrottle.add(what3words.autosuggest.bind(this, query));
  }
  promises.push(p);

  var result = null;
  p.then(function (value) {
    logger.log('debug', 'return value is', value);
    if (nstop === 0) {
      result = JSON.parse(value);
    } else {
      result = {
        status: {
          reason: 'OK',
          status: 200
        },
        suggestions: [],
        thanks: 'thanks for using what3words extended API'
      };
      var suggestions = [];
      _.forEach(JSON.parse(value).suggestions, function (suggestion) {
        if (nstop === 1) {
          suggestions.push({
            words: suggestion.words.substr(0, suggestion.words.lastIndexOf('.'))
          });
        } else if (nstop === 2) {
          suggestions.push({
            words: suggestion.words.substr(0, suggestion.words.indexOf('.'))
          });
        }
      });
      result.suggestions = _.uniqWith(suggestions, _.isEqual);
    }
    res.send(result);
  });
};
