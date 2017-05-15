var ERRORS = require('./errors');

/**
 * Config module
 * @type {Object}
 */
module.exports = {
  getApiKey: function () {
    var apiKey = process.env.W3W_API_KEY;
    return apiKey;
  },
  getEndpoint: function () {
    var endpoint = 'https://api.what3words.com/v2';
    if (process.env.W3W_API_HOST) {
      endpoint = process.env.W3W_API_HOST;
      if (typeof endpoint === 'string' && endpoint.length === 0) {
        throw new Error(ERRORS.INVALID_ENDPOINT);
      }
    }
    return endpoint;
  }
};
