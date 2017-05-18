var request = require('request');
var logger = require('winston');

module.exports = function (options) {
  var p = new Promise(function (resolve, reject) {
    logger.log('debug', options);
    request.get(options, function (error, response, body) {
      if (error) {
        logger.log('warn', error);
        reject(error);
      } else {
        // console.log(body);
        resolve(body);
      }
    });
  });

  return p;
};
