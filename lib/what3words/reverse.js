var _ = require('lodash');
var execute = require('./execute');
/**
 * Reverse Geocoding
 *   Reverse geocodes coordinates, expressed as latitude and longitude to a 3 word address.
 *
 * @param  {Object} params [description]
 * @return {Promise}        [description]
 */
module.exports = function (params) {
  var ERRORS = require('./errors');
  var METHODS = require('./methods');
  if (typeof params === 'undefined' || params === null) {
    throw new Error(ERRORS.UNDEFINED_QUERY);
  }
  // what3words endpoint and key config
  var config = require('./config');
  var endpoint = config.getEndpoint();
  var key = config.getApiKey();
  // adds key to params
  var finalParams = _.extend({
    key: key
  }, params);
  // build request options
  var options = {
    url: endpoint + METHODS.REVERSE,
    qs: finalParams
  };
  // execute request
  return execute(options);
};
