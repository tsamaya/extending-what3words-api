/**
 * what3words API wrapper
 * @type {Object}
 */
module.exports = {
  config: require('./config'),
  errors: require('./errors'),
  languages: require('./languages'),
  reverse: require('./reverse'),
  autosuggest: require('./autosuggest')
};
