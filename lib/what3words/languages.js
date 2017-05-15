var execute = require('./execute');
/**
 * Returns a Promise which will resolve with all available languages
 * @return {Promise} [description]
 */
module.exports = function () {
  // what3words endpoint and key config
  var config = require('./config');
  var METHODS = require('./methods');
  var endpoint = config.getEndpoint();
  var key = config.getApiKey();
  // key to params
  var params = {
    key: key
  };
  // build request options
  var options = {
    url: endpoint + METHODS.LANGUAGES,
    qs: params
  };
  // execute request
  return execute(options);
};
